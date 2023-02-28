package lk.easyCar.controller;

import lk.easyCar.dto.CustomerDTO;
import lk.easyCar.dto.UserDTO;
import lk.easyCar.service.CarReservationService;
import lk.easyCar.service.CustomerService;
import lk.easyCar.service.DriverScheduleService;
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
@CrossOrigin
@RequestMapping("controller/customer")
public class CustomerController {

    @Autowired
    CustomerService customerService;

    @Autowired
    DriverScheduleService driverScheduleService;

    @Autowired
    CarReservationService carReservationService;

//    @PostMapping
//    public ResponseUtil registerCustomer(@ModelAttribute CustomerDTO customerDTO){
//        customerService.saveCustomer(customerDTO);
//        return new ResponseUtil(200,customerDTO.getNic()+ " Added.!",null);
//    }

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
                return new ResponseUtil(500, "Register Failed.Try Again ", null);
            }
        }


        return new ResponseUtil(200, "Register Success....", customerDTO);
    }

    //user can update details,Customer nic,
    // license photo and details came as separate Multipart file
    @PutMapping(path = "update", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseUtil updateCustomerDetails(@RequestBody CustomerDTO customerDTO) {
        String message = customerService.updateCustomer(customerDTO);

        return new ResponseUtil(200, message, null);
    }

    //change  username & password
    @PutMapping(path = "accountSecurity", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil changeCustomerUsernameAndPassword(@RequestBody UserDTO userDTO) {
        customerService.changeCustomerUsernameAndPassword(userDTO);
        return new ResponseUtil(200, "Update Account Username & password Successfully", null);
    }

    @GetMapping(path = "customerDetail/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getCustomerDetail(@PathVariable String id) {
        CustomerDTO customerDTO = customerService.getCustomerDetail(id);
        System.out.println(customerDTO.toString());
        return new ResponseUtil(200, "Done", customerDTO);
    }

    @GetMapping(path = "allCustomerDetail", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllCustomerDetail() {
        return new ResponseUtil(200, "Done", customerService.getAllCustomerDetail());
    }

    // customers register  in current date
    @GetMapping(path = "todayRegisteredUsers", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getTodayRegisteredCustomers() {
        return new ResponseUtil(200, "Done", customerService.getTodayRegisteredCustomers());
    }

    // status
    @GetMapping(path = "customerReservationByStatus", params = {"id", "status"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getCustomerReservationByStatus(@RequestParam String id, @RequestParam String status) {
        return new ResponseUtil(200, "Done", carReservationService.getCustomerReservationByStatus(id, status));
    }

    // admin accept the reservation request driver info should need to send customer if customer request driver
    @GetMapping(path = "sendDriverInfoForAcceptReservations/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil sendDriverInfoForAcceptReservations(@PathVariable String id) {
        return new ResponseUtil(200, "Done", driverScheduleService.getDriverScheduleForSendCustomer(id));
    }

    @DeleteMapping(path = "delete/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil deleteCustomer(@PathVariable String id) {
        customerService.deleteCustomer(id);
        return new ResponseUtil(200, "Delete Your Account Successfully", null);
    }
}
