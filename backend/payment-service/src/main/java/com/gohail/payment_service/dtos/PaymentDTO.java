package com.gohail.payment_service.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentDTO {
    private Long id;
    private Long tripId;
    private Long riderId;
    private Long driverId;
    private double amount;
    private String status;
}
