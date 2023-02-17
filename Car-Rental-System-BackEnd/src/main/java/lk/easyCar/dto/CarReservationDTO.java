package lk.easyCar.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.sql.Date;
import java.sql.Time;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString

public class CarReservationDTO {

    private String reserve_id;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date reserve_date;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date pick_up_date;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date return_date;
    @JsonFormat(pattern = "HH:mm:ss")
    private Time pick_up_time;
    private String pick_up_and_return_venue;
    private int no_of_days;
    private String bank_slip_img;
    private String reservation_status;
    private String driver_status;

    private CustomerDTO customer;

    private CarDTO car;
}
