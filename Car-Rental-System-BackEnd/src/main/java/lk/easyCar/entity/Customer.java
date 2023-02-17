package lk.easyCar.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.sql.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Entity(name = "customer")
public class Customer {
    @Id
    private String nic;
    private String user_name;
    private String password;

    private String customer_name;
    private String license_img;
    private String nic_img;
    private String address;
    private String mobile;
    private String email;
    private Date register_date;

    @OneToMany(mappedBy = "customer",cascade = CascadeType.ALL)
    private List<CarReservation> reservations;

}
