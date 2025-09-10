package com.gohail.driver_service.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.gohail.driver_service.dtos.DriverDTO;
import com.gohail.driver_service.entities.DriverEntity;
import com.gohail.driver_service.models.DriverModel;

@Mapper(componentModel = "spring")
public interface DriverMapper {

     // Model -> Entity
    @Mapping(target = "id", ignore = true)
    DriverEntity toEntity(DriverModel model);

    // Entity -> DTO
    DriverDTO toDto(DriverEntity entity);

    // DTO -> Entity (for updates)
    DriverEntity fromDto(DriverDTO dto);

    // Entity -> Model
    DriverModel toModel(DriverEntity entity);

}
