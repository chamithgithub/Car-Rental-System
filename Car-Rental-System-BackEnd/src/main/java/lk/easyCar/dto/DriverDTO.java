package lk.easyCar.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.sql.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class DriverDTO {
    private String nic;
    private String driver_name;
    private String address;
    private String license_no;
    private String mobile;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date join_date;
    private String user_name;
    private String password;
}
