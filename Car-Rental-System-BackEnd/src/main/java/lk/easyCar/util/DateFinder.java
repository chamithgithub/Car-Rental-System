package lk.easyCar.util;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import static java.time.temporal.TemporalAdjusters.firstDayOfYear;
import static java.time.temporal.TemporalAdjusters.lastDayOfYear;

public class DateFinder {
    static LocalDate today = LocalDate.now();

    public static LocalDate getMonthStartDate() {
        return today.withDayOfMonth(1);
    }

    public static LocalDate getMonthEndDate() {
        return today.withDayOfMonth(today.lengthOfMonth());
    }

    public static LocalDate getWeekStartDate() {
        LocalDate monday = today;
        while (monday.getDayOfWeek() != DayOfWeek.MONDAY) {
            monday = monday.minusDays(1);
        }
        return monday;
    }

    public static LocalDate getWeekEndDate() {
        LocalDate sunday = today;
        while (sunday.getDayOfWeek() != DayOfWeek.SUNDAY) {
            sunday = sunday.plusDays(1);
        }
        return sunday;
    }

    public static LocalDate getYearStartDate() {
        return today.with(firstDayOfYear());
    }

    public static LocalDate getYearEndDate() {
        return today.with(lastDayOfYear());
    }

    public static LocalDate getToday() {
        return today;
    }

    public static LocalDate dateStringToLocalDate(String date) {
        DateTimeFormatter pattern = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return LocalDate.parse(date, pattern);
    }
}
