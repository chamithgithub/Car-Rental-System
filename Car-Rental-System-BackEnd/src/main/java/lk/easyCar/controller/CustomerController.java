package lk.easyCar.controller;

import lk.easyCar.dto.CustomerDTO;

import lk.easyCar.service.CustomerService;
import lk.easyCar.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("customer")
@CrossOrigin
public class CustomerController {

@Autowired
    CustomerService customerService;


    @PostMapping
    public ResponseUtil registerCustomer(@ModelAttribute CustomerDTO customerDTO){
        customerService.saveCustomer(customerDTO);
        return new ResponseUtil(200,customerDTO.getNic()+ " Added.!",null);
    }


}
