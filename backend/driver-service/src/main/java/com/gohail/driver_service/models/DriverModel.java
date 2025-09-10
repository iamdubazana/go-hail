package com.gohail.driver_service.models;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DriverModel {
    private UUID userId; // link to auth user
    private String fullName;
    private String phoneNumber;
    private String licenseNumber;
    private boolean available;
    private String vehicleNumber;
    private String vehicleType;
}
