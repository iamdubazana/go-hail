package com.gohail.driver_service.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import com.gohail.driver_service.entities.DriverEntity;

public interface DriverRepository extends JpaRepository<DriverEntity, UUID> {

    Optional<DriverEntity> findByUserId(UUID userId);

    Optional<DriverEntity> findByLicenseNumber(String licenseNumber);

    Optional<DriverEntity> findByPhoneNumber(String phoneNumber);

    boolean existsByUserId(UUID userId);

    boolean existsByLicenseNumber(String licenseNumber);

    boolean existsByPhoneNumber(String phoneNumber);

}
