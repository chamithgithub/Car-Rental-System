package lk.easyCar.controller;

import lk.easyCar.dto.CustomerDTO;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("customer")
@CrossOrigin
public class CustomerController {

    @GetMapping
    public String saveCustomer(CustomerDTO dto){
        System.out.println(dto.toString());
        return "Customer Added";

    }
}
