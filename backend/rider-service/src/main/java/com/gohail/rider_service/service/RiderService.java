package com.gohail.rider_service.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.gohail.rider_service.dtos.RiderDTO;
import com.gohail.rider_service.entities.RiderEntity;
import com.gohail.rider_service.mapper.RiderMapper;
import com.gohail.rider_service.models.ResModel;
import com.gohail.rider_service.models.RiderModel;
import com.gohail.rider_service.repository.RiderRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RiderService {

    private final RiderRepository riderRepository;
    private final RiderMapper riderMapper;

    // CREATE
    public ResponseEntity<ResModel<RiderDTO>> create(RiderModel model) {
        if (riderRepository.existsByPhoneNumber(model.getPhoneNumber())) {
            return ResponseEntity.status(409)
                .body(ResModel.<RiderDTO>builder()
                    .success(false)
                    .message("Phone already exists")
                    .build());
        }

        RiderEntity saved = riderRepository.save(riderMapper.toEntity(model));

        return ResponseEntity.ok(ResModel.<RiderDTO>builder()
                .success(true)
                .message("Rider created")
                .data(riderMapper.toDto(saved))
                .build());
    }

    // GET by ID
    public ResponseEntity<ResModel<RiderDTO>> getById(UUID id) {
        Optional<RiderEntity> opt = riderRepository.findById(id);
        if (opt.isEmpty()) {
            return ResponseEntity.status(404)
                    .body(ResModel.<RiderDTO>builder()
                            .success(false)
                            .message("Rider not found")
                            .build());
        }

        return ResponseEntity.ok(ResModel.<RiderDTO>builder()
                .success(true)
                .message("Rider fetched")
                .data(riderMapper.toDto(opt.get()))
                .build());
    }

    // GET by user ID
    public ResponseEntity<ResModel<RiderDTO>> getByUserId(UUID id) {
        Optional<RiderEntity> opt = riderRepository.findByUserId(id);
        if (opt.isEmpty()) {
            return ResponseEntity.status(404)
                    .body(ResModel.<RiderDTO>builder()
                            .success(false)
                            .message("Rider not found")
                            .build());
        }

        return ResponseEntity.ok(ResModel.<RiderDTO>builder()
                .success(true)
                .message("Rider fetched")
                .data(riderMapper.toDto(opt.get()))
                .build());
    }

    // UPDATE
    public ResponseEntity<ResModel<RiderDTO>> update(UUID id, RiderModel model) {
        Optional<RiderEntity> opt = riderRepository.findById(id);
        if (opt.isEmpty()) {
            return ResponseEntity.status(404)
                    .body(ResModel.<RiderDTO>builder()
                            .success(false)
                            .message("Rider not found")
                            .build());
        }

        RiderEntity entity = opt.get();
        entity.setFullName(model.getFullName());
        entity.setPhoneNumber(model.getPhoneNumber());

        riderRepository.save(entity);

        return ResponseEntity.ok(ResModel.<RiderDTO>builder()
                .success(true)
                .message("Rider updated")
                .data(riderMapper.toDto(entity))
                .build());
    }

	// GET ALL
    public ResponseEntity<ResModel<List<RiderDTO>>> findAll() {
        List<RiderDTO> riders = riderRepository.findAll().stream()
                .map(riderMapper::toDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(ResModel.<List<RiderDTO>>builder()
                .success(true)
                .message("Riders fetched")
                .data(riders)
                .build());
    }

    // DELETE (soft delete)
    public ResponseEntity<ResModel<Void>> delete(UUID id) {
        Optional<RiderEntity> opt = riderRepository.findById(id);
        if (opt.isEmpty()) {
            return ResponseEntity.status(404)
                    .body(ResModel.<Void>builder()
                            .success(false)
                            .message("Rider not found")
                            .build());
        }

        RiderEntity entity = opt.get();
        riderRepository.save(entity);

        return ResponseEntity.ok(ResModel.<Void>builder()
                .success(true)
                .message("Rider deleted")
                .build());
    }
}
