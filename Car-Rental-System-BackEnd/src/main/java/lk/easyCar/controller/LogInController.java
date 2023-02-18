package lk.easyCar.controller;


import lk.easyCar.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/login")
public class LogInController {


//    @Autowired
//    private BCryptPasswordEncoder passwordEncoder;

    CustomerService customerService;

}
