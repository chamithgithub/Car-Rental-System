package lk.easyCar.service;

import lk.easyCar.dto.DriverDTO;


import java.util.List;

public interface DriverService {
    DriverDTO checkDriverLogIn(String name, String password);

    void saveDriver(DriverDTO driverDTO);

    void UpdateDriver(DriverDTO driverDTO);

    void deleteDriver(String id);

    DriverDTO getDriverDetail(String id);

    List<DriverDTO> getAllDriverDetail();

    List<DriverDTO> getTodayAvailableAndOccupiedDrivers(String status);

}
