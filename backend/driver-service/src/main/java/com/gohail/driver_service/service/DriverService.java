package com.gohail.driver_service.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.gohail.driver_service.dtos.DriverDTO;
import com.gohail.driver_service.entities.DriverEntity;
import com.gohail.driver_service.mapper.DriverMapper;
import com.gohail.driver_service.models.DriverModel;
import com.gohail.driver_service.models.ResModel;
import com.gohail.driver_service.repository.DriverRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DriverService {

    private final DriverRepository driverRepository;
    private final DriverMapper driverMapper;

    // CREATE
    public ResponseEntity<ResModel<DriverDTO>> create(DriverModel model) {
        if (driverRepository.existsByLicenseNumber(model.getLicenseNumber())
                || driverRepository.existsByPhoneNumber(model.getPhoneNumber())) {
            return ResponseEntity.status(409)
                    .body(ResModel.<DriverDTO>builder()
                            .success(false)
                            .message("License number or phone already exists")
                            .build());
        }

        DriverEntity saved = driverRepository.save(driverMapper.toEntity(model));

        return ResponseEntity.ok(ResModel.<DriverDTO>builder()
                .success(true)
                .message("Driver created")
                .data(driverMapper.toDto(saved))
                .build());
    }

    // GET by ID
    public ResponseEntity<ResModel<DriverDTO>> getDriver(UUID id) {
        Optional<DriverEntity> opt = driverRepository.findById(id);
        if (opt.isEmpty()) {
            return ResponseEntity.status(404)
                    .body(ResModel.<DriverDTO>builder()
                            .success(false)
                            .message("Driver not found")
                            .build());
        }

        return ResponseEntity.ok(ResModel.<DriverDTO>builder()
                .success(true)
                .message("Driver fetched")
                .data(driverMapper.toDto(opt.get()))
                .build());
    }

    // GET by User ID
    public ResponseEntity<ResModel<DriverDTO>> getDriverUserId(UUID id) {
        Optional<DriverEntity> opt = driverRepository.findByUserId(id);
        if (opt.isEmpty()) {
            return ResponseEntity.status(404)
                    .body(ResModel.<DriverDTO>builder()
                            .success(false)
                            .message("Driver not found")
                            .build());
        }

        return ResponseEntity.ok(ResModel.<DriverDTO>builder()
                .success(true)
                .message("Driver fetched")
                .data(driverMapper.toDto(opt.get()))
                .build());
    }

    // GET ALL
    public ResponseEntity<ResModel<List<DriverDTO>>> findAll() {
        List<DriverDTO> drivers = driverRepository.findAll().stream()
                .map(driverMapper::toDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(ResModel.<List<DriverDTO>>builder()
                .success(true)
                .message("Drivers fetched")
                .data(drivers)
                .build());
    }

    // UPDATE
    public ResponseEntity<ResModel<DriverDTO>> updateDriver(UUID id, DriverModel model) {
        Optional<DriverEntity> opt = driverRepository.findById(id);
        if (opt.isEmpty()) {
            return ResponseEntity.status(404)
                    .body(ResModel.<DriverDTO>builder()
                            .success(false)
                            .message("Driver not found")
                            .build());
        }

        DriverEntity entity = opt.get();
        entity.setFullName(model.getFullName());
        entity.setPhoneNumber(model.getPhoneNumber());
        entity.setLicenseNumber(model.getLicenseNumber());
        entity.setAvailable(model.isAvailable());
        entity.setVehicleNumber(model.getVehicleNumber());
        entity.setVehicleType(model.getVehicleType());

        driverRepository.save(entity);

        return ResponseEntity.ok(ResModel.<DriverDTO>builder()
                .success(true)
                .message("Driver updated")
                .data(driverMapper.toDto(entity))
                .build());
    }

    // DELETE (soft)
    public ResponseEntity<ResModel<Void>> deleteDriver(UUID id) {
        Optional<DriverEntity> opt = driverRepository.findById(id);
        if (opt.isEmpty()) {
            return ResponseEntity.status(404)
                    .body(ResModel.<Void>builder()
                            .success(false)
                            .message("Driver not found")
                            .build());
        }

        DriverEntity entity = opt.get();
        driverRepository.save(entity);

        return ResponseEntity.ok(ResModel.<Void>builder()
                .success(true)
                .message("Driver deleted")
                .build());
    }
}
