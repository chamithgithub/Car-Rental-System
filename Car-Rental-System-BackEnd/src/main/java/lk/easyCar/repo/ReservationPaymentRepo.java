package lk.easyCar.repo;

import lk.easyCar.entity.ReservationPayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface ReservationPaymentRepo extends JpaRepository<ReservationPayment, String> {

    @Query(value = "SELECT bill_id FROM reservation_payment ORDER BY bill_id DESC limit 1", nativeQuery = true)
    String generateReservationBillId();

    @Query(value = "SELECT SUM(total_payment) FROM reservation_payment WHERE pay_date BETWEEN ?1 AND ?2", nativeQuery = true)
    String getIncomeByDate(LocalDate first_date, LocalDate last_date);

    @Query(value = "SELECT SUM(total_payment) FROM reservation_payment WHERE pay_date=?1", nativeQuery = true)
    String getDailyIncome(LocalDate date);

    @Query(value = "SELECT * FROM reservation_payment WHERE pay_date=current_date()", nativeQuery = true)
    List<ReservationPayment> todayIncomeList();
}
