package com.gohail.driver_service.dtos;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DriverDTO {
    
    private UUID id;
    private UUID userId;  // link to UserEntity
    private String fullName;
    private String phoneNumber;
    private String licenseNumber;
    private boolean available;
    private String vehicleNumber;
    private String vehicleType;
}
