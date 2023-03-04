var data;
$("#admin-payment-searchBtn").click(function () {
    var reserve_id = $("#admin-payment-reservation-searchText").val()

    $.ajax({
        url: baseUrl + "controller/reservation/getReservation/" + reserve_id,
        method: "GET",
        success: function (resp) {
            if (resp.status === 200) {
                data = resp.data;
                generateBillId()
                loadDataToFields(resp.data)
            }
        },
        error: function (err) {
            alert("Wrong reservation ID you entered")
            console.log(err);
            clearPaymentForm();
        }
    });
})

function calculateTotal() {
    let days = $("#admin-payment-noOf-date").val();
    let totalKm = $("#admin-payment-totalKm").val();
    let driver_fee = $("#admin-payment-driver-fee").val();
    let damage_cost = $("#admin-payment-damage-cost").val();

    var extra_km;
    var rate;
    var totalPrice;
    var refund;

    if (days >= 30) {
        rate = data.car.monthly_rate
        extra_km = totalKm - data.free_km_for_month
    } else {
        rate = data.car.daily_rate * days
        extra_km = totalKm - data.car.free_km_for_day * days
    }

    if (extra_km > 0) {
        totalPrice = rate + (extra_km * data.car.price_for_extra_km);
    } else {
        totalPrice = rate
    }

    refund = data.car.waiver_payment - damage_cost;
    $("#admin-payment-refund").val(refund);

    if (driver_fee === "Not Required") {
        $("#admin-payment-total").val(totalPrice);
    } else {
        $("#admin-payment-total").val((+totalPrice) + (+driver_fee));
    }
}

$("#admin-payment-done-calculate").click(function () {
    totalCalculateValidation();

})

$("#admin-payment-discount").keyup(function (event) {
    var regExDiscount = /^[0-9][0-9]*([.][0-9]{2})?$/
    if (regExDiscount.test($("#admin-payment-discount").val())) {
        $("#admin-payment-discount").css('border', '2px solid blue');

        if (event.key === "Enter") {
            let discount = $("#admin-payment-discount").val();
            let total = $("#admin-payment-total").val()
            var subTotal= (+total)-(+total*discount/100);

            $("#admin-payment-subTotal").val(subTotal);
        }
    } else {
        $("#admin-payment-discount").css('border', '2px solid red');
    }

});

$("#admin-payment-cash").keyup(function (event) {
    var regExDiscount = /^[0-9][0-9]*([.][0-9]{2})?$/
    if (regExDiscount.test($("#admin-payment-cash").val())) {
        $("#admin-payment-cash").css('border', '2px solid blue');

        if (event.key === "Enter") {
            let cash = $("#admin-payment-cash").val();
            let balance = cash - $("#admin-payment-subTotal").val()

            $("#admin-payment-balance").val(balance.toFixed(2));
        }
    } else {
        $("#admin-payment-cash").css('border', '2px solid red');
    }

});

$("#admin-payment-paidBtn").click(function () {

    var total = $("#admin-payment-subTotal").val()
    var driver_fee = $("#admin-payment-driver-fee").val();
    var rental_fee;
    if (typeof (driver_fee) == "string") {
        driver_fee = 0;
        rental_fee = total;
    } else {
        rental_fee = (+total) - (+driver_fee)
    }

    var reservation = {
        bill_id: $("#admin-payment-billId").val(),
        pay_date: $("#admin-payment-pay-date").val(),
        no_of_km: +$("#admin-payment-totalKm").val(),
        rental_fee: +rental_fee,
        driver_fee: driver_fee,
        damage_cost: +$("#admin-payment-damage-cost").val(),
        return_cost: +$("#admin-payment-refund").val(),
        total_payment: +total,
        carReservation: {
            reserve_id: $("#admin-payment-reservation-searchText").val(),
        }
    }

    $.ajax({
        url: baseUrl + "controller/payment",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(reservation),
        success: function (res) {
            if (res.status === 200) {
                alert(res.message)
            }
        },
        error: function (ob) {
            console.log(ob.responseJSON.message);
        }
    });
    clearPaymentForm();
    generateBillId()
})

function clearPaymentForm() {
    $('#admin-payment-totalKm,#admin-payment-damage-cost,#admin-payment-cash,#admin-payment-discount,#admin-payment-reservation-searchText').css({
        border: '1px solid #c4c4c4',
    })
    $('#admin-payment-balance,#admin-payment-subTotal,#admin-payment-total,#admin-payment-refund,#admin-payment-driver-fee,#admin-payment-billId,#admin-payment-pay-date,#admin-payment-noOf-date,#admin-payment-return-date,#admin-payment-pickUp-date,#admin-payment-registrationNo,#admin-payment-customer-name,#admin-payment-totalKm,#admin-payment-damage-cost,#admin-payment-cash,#admin-payment-discount,#admin-payment-reservation-searchText').val("")
}

function generateBillId() {
    $.ajax({
        url: baseUrl + "/controller/payment/generateBillId",
        method: "GET",
        success: function (resp) {
            if (resp.status === 200) {
                $("#admin-payment-billId").val(resp.data)
            }
        },
        error: function (err) {
            alert("Wrong reservation ID you entered")
            console.log(err);
        }
    });
}

function loadDataToFields(data) {
    if (data.reservation_status==="Accept"){
        $("#admin-payment-customer-name").val(data.customer.user_name)
        $("#admin-payment-registrationNo").val(data.car.registration_no)
        $("#admin-payment-pickUp-date").val(data.pick_up_date)
        $("#admin-payment-return-date").val(data.return_date)
        $("#admin-payment-noOf-date").val(data.no_of_days)
        $("#admin-payment-pay-date").val(today)

        if (data.driver_status === "YES") {
            $("#admin-payment-driver-fee").val(data.no_of_days * 1000)
        } else {
            $("#admin-payment-driver-fee").val("Not Required")
        }
    }else {
        alert("This Reservation Transaction Is Already Done Or Canceled");
    }
}
