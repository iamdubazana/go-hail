package com.gohail.rider_service.controller;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.gohail.rider_service.dtos.RiderDTO;
import com.gohail.rider_service.models.ResModel;
import com.gohail.rider_service.models.RiderModel;
import com.gohail.rider_service.service.RiderService;

@RestController
@RequestMapping("/api/v1/rider")
@RequiredArgsConstructor
public class RiderController {

    private final RiderService riderService;

    // ---------- CREATE ----------
    @PostMapping
    public ResponseEntity<ResModel<RiderDTO>> create(@RequestBody RiderModel user) {
        return riderService.create(user);
    }

    // ---------- GET BY ID ----------
    @GetMapping("/{id}")
    public ResponseEntity<ResModel<RiderDTO>> getById(@PathVariable UUID id) {
        return riderService.getById(id);
    }

    // ---------- GET BY ID ----------
    @GetMapping("/user/{id}")
    public ResponseEntity<ResModel<RiderDTO>> getByUserId(@PathVariable UUID id) {
        return riderService.getByUserId(id);
    }

    // ---------- GET ALL ----------
    @GetMapping
    public ResponseEntity<ResModel<List<RiderDTO>>> getAll() {
        return riderService.findAll();
    }

    // ---------- UPDATE ----------
    @PutMapping("/{id}")
    public ResponseEntity<ResModel<RiderDTO>> update(
            @PathVariable UUID id,
            @RequestBody RiderModel user) {
        return riderService.update(id, user);
    }

    // ---------- DELETE ----------
    @DeleteMapping("/{id}")
    public ResponseEntity<ResModel<Void>> delete(@PathVariable UUID id) {
        return riderService.delete(id);
    }

}
