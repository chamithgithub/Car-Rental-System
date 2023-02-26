package lk.easyCar.controller;

import lk.easyCar.dto.CustomerDTO;

import lk.easyCar.service.CustomerService;
import lk.easyCar.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;

@RestController
@RequestMapping("controller/customer")
@CrossOrigin
public class CustomerController {

@Autowired
    CustomerService customerService;


//    @PostMapping
//    public ResponseUtil registerCustomer(@ModelAttribute CustomerDTO customerDTO){
//        customerService.saveCustomer(customerDTO);
//        return new ResponseUtil(200,customerDTO.getNic()+ " Added.!",null);
//    }

    //guest user can register as customer,Customer nic,license photo and details came as separate Multipart file
    @ResponseStatus(HttpStatus.CREATED)

    @PostMapping(path = "register", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})

    public ResponseUtil registerCustomer(@RequestPart("file") MultipartFile[] file, @RequestPart("customer") CustomerDTO customerDTO) {

        customerDTO.setLicense_img("uploads/" + customerDTO.getLicense_img());
        customerDTO.setNic_img("uploads/" + customerDTO.getNic_img());

        customerService.saveCustomer(customerDTO);


        for (MultipartFile myFile : file) {

            try {
                String projectPath = new File(this.getClass().getProtectionDomain().getCodeSource().getLocation().toURI()).getParentFile().getParentFile().getAbsolutePath();
                File uploadsDir = new File(projectPath + "/uploads");
                uploadsDir.mkdir();
                myFile.transferTo(new File(uploadsDir.getAbsolutePath() + "/" + myFile.getOriginalFilename()));

            } catch (IOException | URISyntaxException e) {
                e.printStackTrace();
                return new ResponseUtil(500, "Registration Failed.Try Again Latter", null);
            }
        }


        return new ResponseUtil(200, "Registration Successfully....", customerDTO);
    }

}
