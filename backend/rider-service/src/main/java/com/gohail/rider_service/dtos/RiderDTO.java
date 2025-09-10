package com.gohail.rider_service.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RiderDTO {
    private Long id;
    private String name;
    private String email;
    private String phoneNumber;
}
