package lk.easyCar.repo;

import lk.easyCar.entity.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Date;
import java.util.List;

public interface DriverRepo extends JpaRepository<Driver, String> {
    @Query(value = "SELECT * FROM driver WHERE user_name=?1 AND password=?2", nativeQuery = true)
    Driver checkDriverLogIn(String name, String password);

    //SELECT * FROM driver WHERE nic NOT IN (SELECT DISTINCT driver_nic FROM driver_schedule WHERE start_date BETWEEN ?1 AND ?2 OR end_date BETWEEN ?1 AND ?2)ORDER BY RAND() ASC limit 1
    @Query(value = "SELECT * FROM driver WHERE nic NOT IN (SELECT DISTINCT driver_nic FROM driver_schedule WHERE reserve_id" +
            " IN (SELECT DISTINCT reserve_id FROM car_reservation WHERE (pick_up_date BETWEEN ?1 AND ?2 OR return_date BETWEEN ?1 AND ?1) " +
            "AND (reservation_status='Accept')))ORDER BY RAND() ASC limit 1;", nativeQuery = true)
    Driver selectDriverForReservation(Date pick_date, Date return_date);

    @Query(value = "SELECT * FROM driver WHERE nic NOT IN(SELECT DISTINCT driver_nic FROM driver_schedule WHERE current_date() BETWEEN start_date AND end_date AND (reserve_id IN(SELECT DISTINCT reserve_id FROM car_reservation WHERE reservation_status='Accept'))) ", nativeQuery = true)
    List<Driver> getTodayAvailableDrivers();

    @Query(value = "SELECT * FROM driver WHERE nic IN(SELECT DISTINCT driver_nic FROM driver_schedule WHERE current_date() BETWEEN start_date AND end_date AND reserve_id IN(SELECT DISTINCT reserve_id FROM car_reservation WHERE reservation_status='Accept'))  ", nativeQuery = true)
    List<Driver> getTodayOccupiedDrivers();
}
