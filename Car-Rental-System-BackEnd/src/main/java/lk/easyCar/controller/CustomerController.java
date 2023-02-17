package lk.easyCar.controller;

import lk.easyCar.dto.CustomerDTO;
import lombok.ToString;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("customer")
public class CustomerController {

    @GetMapping
    public String saveCustomer(CustomerDTO dto){
        System.out.println(dto.toString());
        return "Customer Added";

    }
}
