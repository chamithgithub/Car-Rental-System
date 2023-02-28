package lk.easyCar.service.impl;

import lk.easyCar.dto.CarReservationDTO;
import lk.easyCar.dto.DriverDTO;
import lk.easyCar.dto.DriverScheduleDTO;
import lk.easyCar.entity.*;
import lk.easyCar.repo.*;
import lk.easyCar.service.CarReservationService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CarReservationServiceImpl implements CarReservationService {
    @Autowired
    CarReservationRepo carReservationRepo;

    @Autowired
    CustomerRepo customerRepo;

    @Autowired
    DriverScheduleRepo driverScheduleRepo;

    @Autowired
    CarRepo carRepo;

    @Autowired
    DriverRepo driverRepo;

    @Autowired
    ModelMapper mapper;

    @Override
    public String generateReservationId() {
        String id = carReservationRepo.generateReservationId();
        if (!(id == null)) {
            int tempId = Integer.parseInt(id.split("-")[1]);
            tempId = tempId + 1;
            if (tempId <= 9) {
                return "RID-000" + tempId;

            } else if (tempId <= 99) {
                return "RID-00" + tempId;

            } else if (tempId <= 999) {
                return "RID-0" + tempId;

            } else {
                return "RID-" + tempId;
            }
        } else {
            return "RID-0001";
        }
    }

    @Override
    public void requestReservation(CarReservationDTO carReservationDTO) {
        if (!carReservationRepo.existsById(carReservationDTO.getReserve_id())) {

            CarReservation carReservation = mapper.map(carReservationDTO, CarReservation.class);

            Customer customer = customerRepo.findById(carReservationDTO.getCustomer().getNic()).get();
            Car car = carRepo.findById(carReservationDTO.getCar().getRegistration_no()).get();

            carReservation.setCustomer(customer);
            carReservation.setCar(car);

            if (carReservationDTO.getDriver_status().equals("YES")) {

                Driver driver = driverRepo.selectDriverForReservation(
                        carReservationDTO.getPick_up_date(),
                        carReservationDTO.getReturn_date());

                DriverScheduleDTO driverScheduleDTO = new DriverScheduleDTO(
                        carReservationDTO.getPick_up_time(),
                        carReservationDTO.getPick_up_date(),
                        carReservationDTO.getReturn_date(),
                        mapper.map(driver, DriverDTO.class),
                        mapper.map(carReservation, CarReservationDTO.class));

                driverScheduleRepo.save(mapper.map(driverScheduleDTO, DriverSchedule.class));

            } else {
                carReservationRepo.save(carReservation);
            }
        } else {
            throw new RuntimeException("Your Reservation Request can't Send in this moment,Try Again..!");
        }
    }

    @Override
    public void updateReservationStatus(String reserve_id, String driver_id, String status) {
        if (carReservationRepo.existsById(reserve_id)) {

            CarReservation carReservation = carReservationRepo.findById(reserve_id).get();
            carReservation.setReservation_status(status);

            if (!driver_id.isEmpty()) {
                Driver driver = driverRepo.findById(driver_id).get();
                DriverSchedule driverSchedule = driverScheduleRepo.getDriverSchedulesByReservationId(reserve_id);
                driverSchedule.setDriver(driver);
                driverSchedule.setCarReservation(carReservation);
            } else {
                carReservationRepo.save(carReservation);
            }
        } else {
            throw new RuntimeException("Can't Review This Reservation,This Reservation Previous Record is Missing.Try Again..!");
        }
    }

    @Override
    public List<CarReservationDTO> getAllPendingReservation() {
        return mapper.map(carReservationRepo.getAllPendingReservation(), new TypeToken<List<CarReservationDTO>>() {
        }.getType());
    }

    @Override
    public CarReservationDTO getReservationDetail(String id) {
        if (carReservationRepo.existsById(id)) {
            return mapper.map(carReservationRepo.findById(id).get(), CarReservationDTO.class);
        } else {
            throw new RuntimeException("Can't Get Details..!  This Reservation Previous Record is Missing.Try Again..!");
        }
    }

    @Override
    public List<CarReservationDTO> getAllTodayReservation() {
        return mapper.map(carReservationRepo.getAllTodayReservation(), new TypeToken<List<CarReservationDTO>>() {
        }.getType());
    }

    @Override
    public List<CarReservationDTO> getAllTodayPickUps() {
        return mapper.map(carReservationRepo.getAllTodayPickUps(), new TypeToken<List<CarReservationDTO>>() {
        }.getType());
    }


    @Override
    public List<CarReservationDTO> getCustomerReservationByStatus(String id, String status) {
        return mapper.map(carReservationRepo.getCustomerReservationByStatus(id, status), new TypeToken<List<CarReservationDTO>>() {
        }.getType());
    }
}
