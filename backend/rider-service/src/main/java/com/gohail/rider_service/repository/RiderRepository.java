package com.gohail.rider_service.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import com.gohail.rider_service.entities.RiderEntity;

public interface RiderRepository extends JpaRepository<RiderEntity, UUID> {

    Optional<RiderEntity> findByUserId(UUID userId);

    Optional<RiderEntity> findByPhoneNumber(String phoneNumber);

    boolean existsByUserId(UUID userId);

    boolean existsByPhoneNumber(String phoneNumber);

}
