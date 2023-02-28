package lk.easyCar.service.impl;

import lk.easyCar.dto.ReservationPaymentDTO;
import lk.easyCar.entity.CarReservation;
import lk.easyCar.entity.ReservationPayment;
import lk.easyCar.repo.CarRepo;
import lk.easyCar.repo.CarReservationRepo;
import lk.easyCar.repo.ReservationPaymentRepo;
import lk.easyCar.service.ReservationPaymentService;
import lk.easyCar.util.DateFinder;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Transactional
@Service
public class ReservationPaymentServiceImpl implements ReservationPaymentService {

    @Autowired
    ReservationPaymentRepo reservationPaymentRepo;

    @Autowired
    CarReservationRepo carReservationRepo;

    @Autowired
    CarRepo carRepo;

    @Autowired
    ModelMapper mapper;

    @Override
    public String generateReservationBillIdId() {
        String id = reservationPaymentRepo.generateReservationBillId();
        if (!(id == null)) {
            int tempId = Integer.parseInt(id.split("-")[1]);
            tempId = tempId + 1;
            if (tempId <= 9) {
                return "BID-000" + tempId;

            } else if (tempId <= 99) {
                return "BID-00" + tempId;

            } else if (tempId <= 999) {
                return "BID-0" + tempId;

            } else {
                return "BID-" + tempId;
            }
        } else {
            return "BID-0001";
        }
    }

    @Override
    public void makePaymentForReservation(ReservationPaymentDTO reservationPaymentDTO) {
        if (!reservationPaymentRepo.existsById(reservationPaymentDTO.getBill_id())) {
            CarReservation carReservation = carReservationRepo.findById(reservationPaymentDTO.getCarReservation().getReserve_id()).get();
            ReservationPayment reservationPayment = mapper.map(reservationPaymentDTO, ReservationPayment.class);
            carReservation.getCar().setMileage(carReservation.getCar().getMileage() + reservationPayment.getNo_of_km());
            carReservation.setReservation_status("Done");
            reservationPayment.setCarReservation(carReservation);
            reservationPaymentRepo.save(reservationPayment);
        } else {
            throw new RuntimeException("Payment Already Done");
        }
    }

    @Override
    public String getIncomeByDate(String type, String start_date, String end_date) {
        if (type.equals("Daily")) {
            LocalDate today = DateFinder.getToday();

            String dailyIncome = reservationPaymentRepo.getDailyIncome(today);
            if (!(dailyIncome == null)) {
                return dailyIncome;
            } else {
                throw new RuntimeException("Today have No Any Transaction had Been");
            }

        } else if (type.equals("Weekly")) {
            LocalDate monthStartDate = DateFinder.getMonthStartDate();
            LocalDate monthEndDate = DateFinder.getMonthEndDate();

            String weeklyIncome = reservationPaymentRepo.getIncomeByDate(monthStartDate, monthEndDate);
            if (!(weeklyIncome == null)) {
                return weeklyIncome;
            } else {
                throw new RuntimeException("This Week have No Any Transaction had Been");
            }
        } else if (type.equals("Monthly")) {
            LocalDate monthStartDate = DateFinder.getMonthStartDate();
            LocalDate monthEndDate = DateFinder.getMonthEndDate();

            String monthlyIncome = reservationPaymentRepo.getIncomeByDate(monthStartDate, monthEndDate);
            if (!(monthlyIncome == null)) {
                return monthlyIncome;
            } else {
                throw new RuntimeException("This Month have No Any Transaction had Been");
            }
        } else if (type.equals("Yearly")) {
            LocalDate yearStartDate = DateFinder.getYearStartDate();
            LocalDate yearEndDate = DateFinder.getYearEndDate();

            String yearlyIncome = reservationPaymentRepo.getIncomeByDate(yearStartDate, yearEndDate);
            if (!(yearlyIncome == null)) {
                return yearlyIncome;
            } else {
                throw new RuntimeException("This Yearly have No Any Transaction had Been");
            }
        } else {
            LocalDate startDate = DateFinder.dateStringToLocalDate(start_date);
            LocalDate endDate = DateFinder.dateStringToLocalDate(end_date);

            String incomeByDate = reservationPaymentRepo.getIncomeByDate(startDate, endDate);
            if (!(incomeByDate == null)) {
                return incomeByDate;
            } else {
                throw new RuntimeException("This Dates have No Any Transaction had Been");
            }
        }
    }

    @Override
    public List<ReservationPaymentDTO> getTodayIncomeList() {
        return mapper.map(reservationPaymentRepo.todayIncomeList(),new TypeToken<List<ReservationPaymentDTO>>(){}.getType());
    }
}
