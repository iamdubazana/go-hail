package com.gohail.trip_service;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TripDTO {
    private Long id;
    private Long driverId;
    private Long riderId;
    private String pickupLocation;
    private String dropoffLocation;
    private double distance;
    private double price;
    private String status;
}