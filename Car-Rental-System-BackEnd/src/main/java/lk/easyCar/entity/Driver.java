package lk.easyCar.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@Entity(name = "driver")
public class Driver {
    @Id
    private String nic;

    private String driver_name;
    private String address;
    private String license_no;
    private String mobile;
    private Date join_date;
    private String user_name;
    private String password;

}
