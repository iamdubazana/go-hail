package com.gohail.rider_service.dtos;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RiderDTO {
    
    private UUID id;
    private UUID userId;
    private String fullName;
    private String phoneNumber;
}
