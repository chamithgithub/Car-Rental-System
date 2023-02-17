package lk.easyCar.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Entity(name = "car_reservation")
public class CarReservation {
    @Id
    private String reserve_id;

    private Date reserve_date;
    private Date pick_up_date;
    private Date return_date;
    private Time pick_up_time;
    private String pick_up_and_return_venue;
    private int no_of_days;
    private String bank_slip_img;
    private String reservation_status;
    private String driver_status;

    @ManyToOne(cascade = {CascadeType.REFRESH,CascadeType.DETACH})
    @JoinColumn(name = "customer_nic")
    private Customer customer;

    @ManyToOne(cascade = {CascadeType.REFRESH,CascadeType.DETACH})
    @JoinColumn(name = "registration_no")
    private Car car;

}
