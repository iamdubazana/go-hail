package com.gohail.auth_service.service;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.gohail.auth_service.dtos.UserDTO;
import com.gohail.auth_service.entities.UserEntity;
import com.gohail.auth_service.mapper.UserMapper;
import com.gohail.auth_service.models.ResModel;
import com.gohail.auth_service.models.UserModel;
import com.gohail.auth_service.repository.UserRepository;
import com.gohail.auth_service.utils.JwtUtil;

@Service
@RequiredArgsConstructor
public class UserService {

	private final UserMapper userMapper;
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtUtil jwtUtil;

	// =========================
	// CREATE USER
	// =========================
	public ResponseEntity<ResModel<UserDTO>> create(UserModel user) {

		// Check if username or email already exists
		if (userRepository.existsByUsername(user.getUsername()) ||
				userRepository.existsByEmail(user.getEmail())) {
			return ResponseEntity.status(409)
					.body(ResModel.<UserDTO>builder()
							.success(false)
							.message("Account with this username or email already exists")
							.build());
		}

		// Hash password
		user.setPassword(passwordEncoder.encode(user.getPassword()));

		// Convert model -> entity -> save
		UserEntity savedUser = userRepository.save(userMapper.toEntity(user));

		// Convert entity -> DTO for response
		UserDTO userDTO = userMapper.toDto(savedUser);

		return ResponseEntity.status(201)
				.body(ResModel.<UserDTO>builder()
						.success(true)
						.message("Account created successfully")
						.data(userDTO)
						.build());
	}

	// =========================
	// READ - Get by ID
	// =========================
	public ResponseEntity<ResModel<UserDTO>> getById(UUID id) {
		Optional<UserEntity> userOpt = userRepository.findById(id);
		if (userOpt.isEmpty()) {
			return ResponseEntity.status(404)
					.body(ResModel.<UserDTO>builder()
							.success(false)
							.message("User not found")
							.build());
		}

		return ResponseEntity.ok(ResModel.<UserDTO>builder()
				.success(true)
				.message("User retrieved")
				.data(userMapper.toDto(userOpt.get()))
				.build());
	}

	// =========================
	// READ - Get all
	// =========================
	public ResponseEntity<ResModel<List<UserDTO>>> getAll() {
		List<UserEntity> users = userRepository.findAll();
		return ResponseEntity.ok(ResModel.<List<UserDTO>>builder()
				.success(true)
				.message("Users retrieved")
				.data(users.stream().map(userMapper::toDto).toList())
				.build());
	}

	// =========================
	// UPDATE
	// =========================
	public ResponseEntity<ResModel<UserDTO>> update(UUID id, UserModel updatedUser) {
		Optional<UserEntity> userOpt = userRepository.findById(id);

		if (userOpt.isEmpty()) {
			return ResponseEntity.status(404)
					.body(ResModel.<UserDTO>builder()
							.success(false)
							.message("Account not found")
							.build());
		}

		UserEntity user = userOpt.get();

		// Update fields
		user.setUsername(updatedUser.getUsername());
		user.setEmail(updatedUser.getEmail());

		if (updatedUser.getPassword() != null &&
				!updatedUser.getPassword().isBlank()) {
			user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
		}

		UserEntity savedUser = userRepository.save(user);

		return ResponseEntity.ok(ResModel.<UserDTO>builder()
				.success(true)
				.message("User updated successfully")
				.data(userMapper.toDto(savedUser))
				.build());
	}

	// =========================
	// DELETE
	// =========================
	public ResponseEntity<ResModel<Void>> delete(UUID id) {
		if (!userRepository.existsById(id)) {
			return ResponseEntity.status(404)
					.body(ResModel.<Void>builder()
							.success(false)
							.message("User not found")
							.build());
		}

		userRepository.deleteById(id);

		return ResponseEntity.ok(ResModel.<Void>builder()
				.success(true)
				.message("User deleted successfully")
				.build());
	}

	// =========================
	// FIND BY EMAIL
	// =========================
	public ResponseEntity<ResModel<UserDTO>> findByEmail(String email) {
		Optional<UserEntity> userOpt = userRepository.findByEmail(email);

		if (userOpt.isEmpty()) {
			return ResponseEntity.status(404)
					.body(ResModel.<UserDTO>builder()
							.success(false)
							.message("User not found")
							.build());
		}

		return ResponseEntity.ok(ResModel.<UserDTO>builder()
				.success(true)
				.message("User retrieved")
				.data(userMapper.toDto(userOpt.get()))
				.build());
	}

	// ---------- VALIDATE LOGIN ----------
	// ---------- LOGIN / VALIDATE CREDENTIALS ----------
	public ResponseEntity<ResModel<String>> login(String email, String password) {

		Optional<UserEntity> userOpt = userRepository.findByEmail(email);

		if (userOpt.isEmpty() || !passwordEncoder.matches(password, userOpt.get().getPassword())) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body(ResModel.<String>builder()
							.success(false)
							.message("Invalid email or password")
							.build());
		}

		UserEntity user = userOpt.get();

		// Generate JWT token
		String token = jwtUtil.generateToken(user.getId(), user.getRole().name());

		return ResponseEntity.ok(
				ResModel.<String>builder()
						.success(true)
						.message("Login successful")
						.data(token)
						.build());
	}

}
