package lk.easyCar.controller;

import lk.easyCar.dto.AdminDTO;
import lk.easyCar.dto.CustomerDTO;
import lk.easyCar.dto.DriverDTO;
import lk.easyCar.dto.UserDTO;
import lk.easyCar.service.AdminService;
import lk.easyCar.service.CustomerService;
import lk.easyCar.service.DriverService;
import lk.easyCar.util.PasswordEncryptor;
import lk.easyCar.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("controller/login")
public class LogInController {



    @Autowired
    CustomerService customerService;

    @Autowired
    AdminService adminService;

    @Autowired
    DriverService driverService;

    @Autowired
    PasswordEncryptor passwordEncryptor;

//    check login
    @PostMapping (produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil checkUserNameAndPassword(@RequestBody UserDTO userDTO) {

        String encryptedPassword = passwordEncryptor.doHashing(userDTO.getPassword());

        CustomerDTO customerDTO = customerService.checkCustomerLogIn(userDTO.getUser_name(), encryptedPassword);
        if (customerDTO == null) {
            AdminDTO adminDTO = adminService.checkAdminLogIn(userDTO.getUser_name(),encryptedPassword);
            if (adminDTO == null) {
                DriverDTO driverDTO = driverService.checkDriverLogIn(userDTO.getUser_name(), encryptedPassword);
                if (!(driverDTO ==null)) {
                    return new ResponseUtil(200, "Driver", driverDTO);
                }else {
                    return new ResponseUtil(200, "Incorrect User Name and Password", null);
                }
            } else {
                return new ResponseUtil(200, "Admin", adminDTO);
            }
        } else {
            return new ResponseUtil(200, "Customer", customerDTO);
        }
    }

}
