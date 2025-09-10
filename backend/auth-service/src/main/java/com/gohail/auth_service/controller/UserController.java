package com.gohail.auth_service.controller;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.gohail.auth_service.dtos.UserDTO;
import com.gohail.auth_service.models.LoginModel;
import com.gohail.auth_service.models.ResModel;
import com.gohail.auth_service.models.UserModel;
import com.gohail.auth_service.service.UserService;
;

@RestController
@RequestMapping("/api/v1/auth/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // ---------- CREATE ----------
    @PostMapping
    public ResponseEntity<ResModel<UserDTO>> create(@RequestBody UserModel user) {
        return userService.create(user);
    }
    
    // ---------- GET BY ID ----------
    @GetMapping("/{id}")
    public ResponseEntity<ResModel<UserDTO>> getById(@PathVariable UUID id) {
        return userService.getById(id);
    }
    
    // ---------- GET ALL ----------
    @GetMapping
    public ResponseEntity<ResModel<List<UserDTO>>> getAll() {
        return userService.getAll();
    }

    // ---------- UPDATE ----------
    @PutMapping("/{id}")
    public ResponseEntity<ResModel<UserDTO>> update(
            @PathVariable UUID id,
            @RequestBody UserModel user
    ) {
        return userService.update(id, user);
    }

    // ---------- DELETE ----------
    @DeleteMapping("/{id}")
    public ResponseEntity<ResModel<Void>> delete(@PathVariable UUID id) {
        return userService.delete(id);
    }

    // ---------- FIND BY EMAIL ----------
    @GetMapping("/email/{email}")
    public ResponseEntity<ResModel<UserDTO>> findByEmail(@PathVariable String email) {
        return userService.findByEmail(email);
    }

    @PostMapping("/validate")
    public ResponseEntity<ResModel<String>> validate(@RequestBody LoginModel request) {
        return userService.login(request.getEmail(), request.getPassword());
    }
}
