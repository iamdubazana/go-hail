package com.gohail.auth_service.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import com.gohail.auth_service.entities.UserEntity;
import com.gohail.auth_service.enums.Role;

public interface UserRepository extends JpaRepository<UserEntity, UUID> {

    // Find a user by username
    Optional<UserEntity> findByUsername(String username);

    // Find a user by email
    Optional<UserEntity> findByEmail(String email);

    // Check if email exists
    boolean existsByEmail(String email);

    // Check if username exists
    boolean existsByUsername(String username);

    // Find all users by role
    List<UserEntity> findAllByRole(Role role);
}
