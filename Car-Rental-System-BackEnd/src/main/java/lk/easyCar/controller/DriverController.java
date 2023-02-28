package lk.easyCar.controller;

import lk.easyCar.dto.DriverDTO;
import lk.easyCar.service.DriverScheduleService;
import lk.easyCar.service.DriverService;
import lk.easyCar.util.ResponseUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("controller/driver")
public class DriverController {

    @Autowired
    DriverService driverService;

    @Autowired
    DriverScheduleService driverScheduleService;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(path = "addDriver",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil saveDriver(@RequestBody DriverDTO driverDTO) {
        driverService.saveDriver(driverDTO);
        return new ResponseUtil(200, "Driver Added Successfully", null);
    }


    @PutMapping(path = "updateDriver",produces = MediaType.APPLICATION_JSON_VALUE)
    private ResponseUtil updateDriverDetail(@RequestBody DriverDTO driverDTO) {
        driverService.UpdateDriver(driverDTO);
        return new ResponseUtil(200, "Driver Updated Successfully", null);
    }

    @DeleteMapping(path = "removeDriver/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil deleteDriverDetail(@PathVariable String id) {
        driverService.deleteDriver(id);
        return new ResponseUtil(200, "Driver Details Deleted Successfully", null);
    }

    @GetMapping(path = "driverDetail/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getDriverDetail(@PathVariable String id) {
        return new ResponseUtil(200, "Done", driverService.getDriverDetail(id));
    }

    @GetMapping(path = "allDriverDetail", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllDriverDetail() {
        return new ResponseUtil(200, "Done", driverService.getAllDriverDetail());
    }

    //when send two dates,then return
    // schedule of drivers suitable for that
    @GetMapping(path = "driverScheduleByDate", params = {"start_date", "end_date"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getDriverScheduleByDate(@RequestParam String start_date, @RequestParam String end_date) {
        return new ResponseUtil(200, "Done", driverScheduleService.getDriverSchedulesByDate(start_date, end_date));
    }

    //Return driver list of today available or
    // occupied drivers.That selected on admin request status
    @GetMapping(path = "todayAvailableAndOccupiedDrivers/{status}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getTodayAvailableAndOccupiedDrivers(@PathVariable String status) {
        return new ResponseUtil(200, "Done", driverService.getTodayAvailableAndOccupiedDrivers(status));
    }

    //get weekly and monthly driver schedule
    @GetMapping(path = "weeklyAndMonthlyScheduleByDriver", params = {"id", "date"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil weeklyScheduleByDriver(@RequestParam String id, @RequestParam String date) {
        return new ResponseUtil(200, "Done", driverScheduleService.getDriverWeeklyScheduleByDate(id,date));
    }

  @GetMapping(path = "getSchedule/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil weeklyScheduleByDriver(@PathVariable String id) {
        return new ResponseUtil(200, "Done", driverScheduleService.getDriverByReservationId(id));
    }

}
