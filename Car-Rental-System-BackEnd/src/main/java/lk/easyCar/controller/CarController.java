package lk.easyCar.controller;

import lk.easyCar.dto.CarDTO;
import lk.easyCar.service.CarService;
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
@RequestMapping("controller/car")
public class CarController {

    @Autowired
    CarService carService;



//    public ResponseUtil getCarDetail(@PathVariable String id) {
//        CarDTO carDTO = carService.getCarDetail(id);
//        return new ResponseUtil(200, "Done", carDTO);
//    }


    //Save Customer photos and details
    // came as separate Multipart file
    @ResponseStatus(HttpStatus.OK)
    @PostMapping(path = "addNewCar", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseUtil addCar(@RequestPart("file") MultipartFile[] file, @RequestPart("car") CarDTO carDTO) {

        carDTO.getCarImgDetail().setImage_1("uploads/" + carDTO.getCarImgDetail().getImage_1());
        carDTO.getCarImgDetail().setImage_2("uploads/" + carDTO.getCarImgDetail().getImage_2());
        carDTO.getCarImgDetail().setImage_3("uploads/" + carDTO.getCarImgDetail().getImage_3());
        carDTO.getCarImgDetail().setImage_4("uploads/" + carDTO.getCarImgDetail().getImage_4());

        carService.saveCar(carDTO);


        for (MultipartFile myFile : file) {
            try {
                String projectPath = new File(this.getClass().getProtectionDomain().getCodeSource().getLocation().toURI()).getParentFile().getParentFile().getAbsolutePath();
                File uploadsDir = new File(projectPath + "/uploads");
                uploadsDir.mkdir();
                myFile.transferTo(new File(uploadsDir.getAbsolutePath() + "/" + myFile.getOriginalFilename()));

            } catch (IOException | URISyntaxException e) {
                e.printStackTrace();
                return new ResponseUtil(500, "New Vehicle Add Failed.Try Again Latter", null);
            }
        }


        return new ResponseUtil(200, "New Vehicle Registered Successfully...", null);

    }

    //Update Customer photos and details
    // came as separate Multipart file
    @PutMapping(path = "updateCarDetail", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseUtil updateCarDetails(@RequestPart("file") MultipartFile[] file, @RequestPart("car") CarDTO carDTO) {
        carDTO.getCarImgDetail().setImage_1("uploads/" + carDTO.getCarImgDetail().getImage_1());
        carDTO.getCarImgDetail().setImage_2("uploads/" + carDTO.getCarImgDetail().getImage_2());
        carDTO.getCarImgDetail().setImage_3("uploads/" + carDTO.getCarImgDetail().getImage_3());
        carDTO.getCarImgDetail().setImage_4("uploads/" + carDTO.getCarImgDetail().getImage_4());

        carService.updateCar(carDTO);

        for (MultipartFile myFile : file) {
            try {
                String projectPath = new File(this.getClass().getProtectionDomain().getCodeSource().getLocation().toURI()).getParentFile().getParentFile().getAbsolutePath();
                File uploadsDir = new File(projectPath + "/uploads");
                myFile.transferTo(new File(uploadsDir.getAbsolutePath() + "/" + myFile.getOriginalFilename()));

            } catch (IOException | URISyntaxException e) {
                e.printStackTrace();
                return new ResponseUtil(500, "Update Vehicle Details Failed.Try Again Latter", null);
            }
        }
        return new ResponseUtil(200, "Update Vehicle Details Successfully...", null);
    }

    //send status of car as available or unavailable by admin.check the status with given id and save
    @PutMapping(params = {"id", "status"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil updateCarStatusForUnavailableOrAvailable(@RequestParam String id, @RequestParam String status) {
        carService.setCarStatusUnavailableOrAvailable(id, status);
        return new ResponseUtil(200, "Set Car " + id + " As " + status, null);
    }

    @GetMapping(path = "carDetail/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getCarDetail(@PathVariable String id) {
        CarDTO carDTO = carService.getCarDetail(id);
        return new ResponseUtil(200, "Done", carDTO);
    }

    @GetMapping(path = "allCarDetail", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllCarDetail() {
        return new ResponseUtil(200, "Done", carService.getAllCarDetail());
    }

    //return cars they are statuses is maintained
    @GetMapping(path = "carsUnderMaintain", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getCarsUnderMaintain() {
        return new ResponseUtil(200, "Done", carService.getCarsUnderMaintain());
    }

    //return cars they are needed to maintaining
    @GetMapping(path = "carsNeedMaintain", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getCarsNeedMaintain() {
        return new ResponseUtil(200, "Done", carService.getCarsNeedMaintain());
    }

    //sent status as Available or Unavailable,Then check it with cars
    @GetMapping(path = "unavailableOrAvailableCarsByStatus/{status}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getUnavailableOrAvailableCars(@PathVariable String status) {
        return new ResponseUtil(200, "Done", carService.getUnavailableOrAvailableCarsByStatus(status));
    }

    //check available and rental vehicles by giving gap of dates
    @GetMapping(path = "availableOrRentalCarsByDate", params = {"pick_up_date", "return_date", "status"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAvailableAndRentalCarsForReservation(@RequestParam String pick_up_date, @RequestParam String return_date, @RequestParam String status) {
        return new ResponseUtil(200, "Done", carService.getAvailableAndRentalCarsForReservation(pick_up_date, return_date, status));
    }

    //carts sort by admin selected attributes
    @GetMapping(path = "carsSortByAttribute", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil carsSortByAttribute(@RequestBody CarDTO carDTO) {
        return new ResponseUtil(200, "Done", carService.sortCarsByAttributes(carDTO));
    }

    @DeleteMapping(path = "removeCar/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil deleteCarDetail(@PathVariable String id) {
        carService.deleteCar(id);
        return new ResponseUtil(200, "Vehicle Details Deleted Successfully", null);
    }
}
