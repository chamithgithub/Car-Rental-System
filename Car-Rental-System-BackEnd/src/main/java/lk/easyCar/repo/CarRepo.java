package lk.easyCar.repo;

import lk.easyCar.entity.Car;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CarRepo extends JpaRepository<Car, String> {

    @Query(value = "SELECT * FROM car WHERE status='UnderMaintain'", nativeQuery = true)
    List<Car> getCarsUnderMaintain();

    @Query(value = "SELECT * FROM car WHERE status=?1", nativeQuery = true)
    List<Car> getUnavailableOrAvailableCarsByStatus(String status);

    @Query(value = "SELECT * FROM car WHERE MOD(mileage,5000) = 0 AND status NOT IN('UnderMaintain')", nativeQuery = true)
    List<Car> getCarsNeedMaintain();

    @Query(value = "SELECT * FROM car WHERE registration_no NOT IN (SELECT DISTINCT registration_no FROM car_reservation WHERE (reservation_status='Pending' OR reservation_status='Accept') AND (pick_up_date BETWEEN ?1 AND ?2 OR return_date BETWEEN ?1 AND ?2 )) AND status='Available'", nativeQuery = true)
    List<Car> getAvailableCarsForReservation(String pick_date, String return_date);

    @Query(value = "SELECT * FROM car WHERE status='Available' AND registration_no NOT IN (SELECT DISTINCT registration_no FROM car_reservation WHERE (reservation_status='Pending' OR reservation_status='Accept') AND ?1 BETWEEN pick_up_date AND return_date) ", nativeQuery = true)
    List<Car> getAvailableCarsForReservationOnDay(String select_date);

    @Query(value = "SELECT * FROM car WHERE registration_no IN (SELECT DISTINCT registration_no FROM car_reservation WHERE  (reservation_status='Accept') AND (pick_up_date BETWEEN ?1 AND ?2 OR return_date BETWEEN ?1 AND ?2)) AND status='Available'", nativeQuery = true)
    List<Car> getRentalCars(String pick_up_date, String return_date);

    @Query(value = "SELECT * FROM car WHERE registration_no IN (SELECT DISTINCT registration_no FROM car_reservation WHERE (reservation_status='Pending' OR reservation_status='Accept') AND ?1 BETWEEN pick_up_date AND return_date) AND status='Available'", nativeQuery = true)
    List<Car> getRentalCarsOnDay(String select_date);

    @Query(value = "SELECT c FROM car c WHERE (:transmission is null OR c.transmission=:transmission) AND (:brand is null OR c.brand=:brand) AND (:fuel is null OR c.fuel_type=:fuel) AND (:type is null OR c.type=:type) AND (:no_of_passengers = 0 OR c.no_of_passengers=:no_of_passengers) order by c.registration_no asc ")
    List<Car> sortCarsByAttributes(@Param("transmission") String transmission, @Param("brand") String brand, @Param("type") String type,
                                   @Param("fuel") String fuel, @Param("no_of_passengers") int no_of_passengers);
}
