package com.gohail.rider_service.models;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RiderModel {
    
    private UUID userId;
    private String fullName;
    private String phoneNumber;
}
