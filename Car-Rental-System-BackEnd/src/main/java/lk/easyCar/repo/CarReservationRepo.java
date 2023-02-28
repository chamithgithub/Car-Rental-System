package lk.easyCar.repo;

import lk.easyCar.entity.CarReservation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CarReservationRepo extends JpaRepository<CarReservation, String> {

    @Query(value = "SELECT reserve_id FROM car_reservation ORDER BY reserve_id DESC limit 1", nativeQuery = true)
    String generateReservationId();

    @Query(value = "SELECT * FROM car_reservation WHERE reservation_status='Pending'", nativeQuery = true)
    List<CarReservation> getAllPendingReservation();

    @Query(value = "SELECT * FROM car_reservation WHERE reserve_date=current_date()", nativeQuery = true)
    List<CarReservation> getAllTodayReservation();

    @Query(value = "SELECT * FROM car_reservation WHERE pick_up_date=current_date() AND reservation_status='Accept'", nativeQuery = true)
    List<CarReservation> getAllTodayPickUps();

    @Query(value = "SELECT * FROM car_reservation WHERE customer_nic=?1 AND reservation_status=?2", nativeQuery = true)
    List<CarReservation> getCustomerReservationByStatus(String id, String status);

    @Query(value = "SELECT * FROM car_reservation WHERE (customer_nic=?1) AND (reservation_status='Accept') AND (current_date() BETWEEN pick_up_date AND return_date)", nativeQuery = true)
    CarReservation checkTodayCustomerInReservationOrNot(String id);

}
