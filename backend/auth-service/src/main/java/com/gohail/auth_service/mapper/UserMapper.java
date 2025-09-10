package com.gohail.auth_service.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.gohail.auth_service.dtos.UserDTO;
import com.gohail.auth_service.entities.UserEntity;
import com.gohail.auth_service.models.UserModel;

@Mapper(componentModel = "spring")
public interface UserMapper {

    // UserModel -> UserEntity
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "enabled", ignore = true)
    @Mapping(target = "locked", ignore = true)
    @Mapping(target = "deleted", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    UserEntity toEntity(UserModel userModel);

    // UserEntity -> UserModel
    UserModel toModel(UserEntity userEntity);

    // UserEntity -> UserDTO
    UserDTO toDto(UserEntity userEntity);

    // UserDTO -> UserEntity
    @Mapping(target = "password", ignore = true)
    UserEntity fromDto(UserDTO userDto);

}
