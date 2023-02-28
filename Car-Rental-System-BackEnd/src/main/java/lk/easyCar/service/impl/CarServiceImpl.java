package lk.easyCar.service.impl;

import lk.easyCar.dto.CarDTO;
import lk.easyCar.entity.Car;
import lk.easyCar.repo.CarRepo;
import lk.easyCar.service.CarService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@Transactional
public class CarServiceImpl implements CarService {

    @Autowired
    CarRepo carRepo;

    @Autowired
    ModelMapper mapper;

    @Override
    public void saveCar(CarDTO carDTO) {
        if (!carRepo.existsById(carDTO.getRegistration_no())) {
            carRepo.save(mapper.map(carDTO, Car.class));
        } else {
            throw new RuntimeException("This Vehicle Already Registered To System..!");
        }
    }

    @Override
    public void updateCar(CarDTO carDTO) {
        if (carRepo.existsById(carDTO.getRegistration_no())) {
            carRepo.save(mapper.map(carDTO, Car.class));
        } else {
            throw new RuntimeException("Update Failed.!  This Vehicle's Previous Record is Missing..Add Again");
        }
    }

    @Override
    public void deleteCar(String id) {
        if (carRepo.existsById(id)) {
            carRepo.deleteById(id);
        } else {
            throw new RuntimeException("Can't Delete.!  This Vehicle's Previous Record is Missing..Add Again");
        }
    }

    @Override
    public CarDTO getCarDetail(String id) {
        if (carRepo.existsById(id)) {
            return mapper.map(carRepo.findById(id).get(), CarDTO.class);
        } else {
            throw new RuntimeException("Can't Get Details.!  This Vehicle's Previous Record is Missing..Add Again");
        }
    }

    @Override
    public List<CarDTO> getAllCarDetail() {
        return mapper.map(carRepo.findAll(), new TypeToken<List<CarDTO>>() {
        }.getType());
    }

    @Override
    public List<CarDTO> getCarsUnderMaintain() {
        return mapper.map(carRepo.getCarsUnderMaintain(), new TypeToken<List<CarDTO>>() {
        }.getType());
    }

    @Override
    public List<CarDTO> getCarsNeedMaintain() {
        return mapper.map(carRepo.getCarsNeedMaintain(), new TypeToken<List<CarDTO>>() {
        }.getType());
    }

    @Override
    public List<CarDTO> getUnavailableOrAvailableCarsByStatus(String status) {
        return mapper.map(carRepo.getUnavailableOrAvailableCarsByStatus(status), new TypeToken<List<CarDTO>>() {
        }.getType());
    }


    @Override
    public List<CarDTO> getAvailableAndRentalCarsForReservation(String pick_up_date, String return_date, String status) {
        if ((pick_up_date.isEmpty() || return_date.isEmpty()) && pick_up_date.isEmpty()) {
            throw new RuntimeException("Please Select date for Show Available Vehicles.!");
        }
        //check the status for filter results of cars as rental and available
        if (status.equals("Available")) {
            if (return_date.isEmpty()) {
                return mapper.map(carRepo.getAvailableCarsForReservationOnDay(pick_up_date), new TypeToken<List<CarDTO>>() {
                }.getType());
            } else {
                return mapper.map(carRepo.getAvailableCarsForReservation(pick_up_date, return_date), new TypeToken<List<CarDTO>>() {
                }.getType());
            }
        } else if (status.equals("Rental")) {
            if (return_date.isEmpty()) {
                return mapper.map(carRepo.getRentalCarsOnDay(pick_up_date), new TypeToken<List<CarDTO>>() {
                }.getType());
            } else {
                return mapper.map(carRepo.getRentalCars(pick_up_date, return_date), new TypeToken<List<CarDTO>>() {
                }.getType());
            }
        } else {
            throw new RuntimeException("Select Available Or Rental Cars You Want");
        }
    }

    @Override
    public void setCarStatusUnavailableOrAvailable(String id, String status) {
        if (carRepo.existsById(id)) {
            Car car = carRepo.findById(id).get();
            car.setStatus(status);
            carRepo.save(car);
        } else {
            throw new RuntimeException("Can't Get Details.!  This Vehicle's Previous Record is Missing..Add Again");

        }
    }

    @Override
    public List<CarDTO> sortCarsByAttributes(CarDTO carDTO) {
        return mapper.map(carRepo.sortCarsByAttributes(carDTO.getTransmission(), carDTO.getBrand()
                , carDTO.getType(), carDTO.getFuel_type(), carDTO.getNo_of_passengers()), new TypeToken<List<CarDTO>>() {
        }.getType());
    }
}
