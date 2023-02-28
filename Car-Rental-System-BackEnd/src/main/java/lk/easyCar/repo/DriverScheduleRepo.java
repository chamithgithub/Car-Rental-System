package lk.easyCar.repo;

import lk.easyCar.entity.DriverSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface DriverScheduleRepo extends JpaRepository<DriverSchedule, String> {

    @Query(value = "SELECT * FROM driver_schedule WHERE reserve_id NOT IN(SELECT reserve_id FROM car_reservation WHERE reservation_status='Done' OR reservation_status='Deny') AND (start_date BETWEEN ?1 AND ?2 OR end_date BETWEEN ?1 AND ?2)", nativeQuery = true)
    List<DriverSchedule> getDriverSchedulesByDate(String start_date, String end_date);

    @Query(value = "SELECT * FROM driver_schedule WHERE reserve_id=?1 ", nativeQuery = true)
    DriverSchedule getDriverSchedulesByReservationId(String reserve_id);

    @Query(value = "SELECT * FROM driver_schedule WHERE reserve_id NOT IN(SELECT reserve_id FROM car_reservation WHERE reservation_status='Done' OR reservation_status='Deny') AND (driver_nic=?1) AND (start_date BETWEEN ?2 AND ?3 OR end_date BETWEEN ?2 AND ?3)", nativeQuery = true)
    List<DriverSchedule> getDriverWeeklyOrMonthlyScheduleByDate(String driver_id, LocalDate first_date, LocalDate last_date);

    @Query(value = "SELECT driver_nic FROM driver_schedule WHERE reserve_id=?1",nativeQuery = true)
    String getDriverIdByReservationId(String id);
}
