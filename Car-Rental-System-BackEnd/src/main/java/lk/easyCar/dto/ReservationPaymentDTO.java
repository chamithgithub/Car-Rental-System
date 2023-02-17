package lk.easyCar.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.math.BigDecimal;
import java.sql.Date;
@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class ReservationPaymentDTO {
    private String bill_id;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date pay_date;
    private int no_of_km;
    private BigDecimal rental_fee;
    private BigDecimal driver_fee;
    private BigDecimal damage_cost;
    private BigDecimal return_cost;
    private BigDecimal total_payment;

    private CarReservationDTO carReservation;
}
