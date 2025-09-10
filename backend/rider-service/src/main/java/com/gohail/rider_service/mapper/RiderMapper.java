package com.gohail.rider_service.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.gohail.rider_service.dtos.RiderDTO;
import com.gohail.rider_service.entities.RiderEntity;
import com.gohail.rider_service.models.RiderModel;

@Mapper(componentModel = "spring")
public interface RiderMapper {

     // Model -> Entity
    @Mapping(target = "id", ignore = true)
    RiderEntity toEntity(RiderModel model);

    // Entity -> DTO
    RiderDTO toDto(RiderEntity entity);

    // DTO -> Entity (for updates)
    RiderEntity fromDto(RiderDTO dto);

    // Entity -> Model
    RiderModel toModel(RiderEntity entity);

}
