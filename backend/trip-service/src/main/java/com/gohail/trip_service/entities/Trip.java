package com.gohail.trip_service.entities;

import java.time.LocalDateTime;

import com.gohail.trip_service.enums.TripStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "trips")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Trip {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long driverId; // Link to driver-service
    private Long riderId;  // Link to rider-service

    private String pickupLocation;
    private String dropoffLocation;
    private double distance; // in km
    private double price;

    private LocalDateTime startTime;
    private LocalDateTime endTime;

    @Enumerated(EnumType.STRING)
    private TripStatus status;
}
