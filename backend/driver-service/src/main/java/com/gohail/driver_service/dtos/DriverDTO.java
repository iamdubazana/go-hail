package com.gohail.driver_service.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DriverDTO {
    private Long id;
    private String name;
    private String phoneNumber;
    private boolean available;
    private String vehicleNumber;
    private String vehicleType;
}
