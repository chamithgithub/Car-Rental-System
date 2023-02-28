package lk.easyCar.service;

import lk.easyCar.dto.ReservationPaymentDTO;


import java.util.List;

public interface ReservationPaymentService {

    String generateReservationBillIdId();

    void makePaymentForReservation(ReservationPaymentDTO reservationPaymentDTO);

    String getIncomeByDate(String type, String start_date, String end_date);

    List<ReservationPaymentDTO> getTodayIncomeList();
}
