package com.gohail.driver_service.controller;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.gohail.driver_service.dtos.DriverDTO;
import com.gohail.driver_service.models.DriverModel;
import com.gohail.driver_service.models.ResModel;
import com.gohail.driver_service.service.DriverService;

@RestController
@RequestMapping("/api/v1/driver")
@RequiredArgsConstructor
public class DriverController {

    private final DriverService driverService;

    // ---------- CREATE ----------
    @PostMapping
    public ResponseEntity<ResModel<DriverDTO>> create(@RequestBody DriverModel model) {
        return driverService.create(model);
    }
    
    // ---------- GET BY ID ----------
    @GetMapping("/{id}")
    public ResponseEntity<ResModel<DriverDTO>> getById(@PathVariable UUID id) {
        return driverService.getDriver(id);
    }

    // ---------- GET BY ID ----------
    @GetMapping("/user/{id}")
    public ResponseEntity<ResModel<DriverDTO>> getByUserId(@PathVariable UUID id) {
        return driverService.getDriverUserId(id);
    }
    
    // ---------- GET ALL ----------
    @GetMapping
    public ResponseEntity<ResModel<List<DriverDTO>>> getAll() {
        return driverService.findAll();
    }

    // ---------- UPDATE ----------
    @PutMapping("/{id}")
    public ResponseEntity<ResModel<DriverDTO>> update(
            @PathVariable UUID id,
            @RequestBody DriverModel model
    ) {
        return driverService.updateDriver(id, model);
    }

    // ---------- DELETE ----------
    @DeleteMapping("/{id}")
    public ResponseEntity<ResModel<Void>> delete(@PathVariable UUID id) {
        return driverService.deleteDriver(id);
    }
}
