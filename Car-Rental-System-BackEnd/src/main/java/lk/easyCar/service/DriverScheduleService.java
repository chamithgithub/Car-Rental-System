package lk.easyCar.service;

import lk.easyCar.dto.DriverScheduleDTO;


import java.util.List;

public interface DriverScheduleService {
    List<DriverScheduleDTO> getDriverSchedulesByDate(String start_date, String end_date);

    List<DriverScheduleDTO> getDriverWeeklyScheduleByDate(String driver_id, String date_range);

    List<DriverScheduleDTO> getDriverScheduleForSendCustomer(String customer_id);

    String getDriverByReservationId(String id);
}

