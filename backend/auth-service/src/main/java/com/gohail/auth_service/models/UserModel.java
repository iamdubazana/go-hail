package com.gohail.auth_service.models;

import com.gohail.auth_service.enums.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserModel {

    private String username;
    private String email;
    private String password;
    private Role role;
}
