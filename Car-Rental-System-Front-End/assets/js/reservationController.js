
$("#admin-pending-reservation").click(function () {
    $("#admin-reservation-title").css("display", "block")
    $("#admin-todayPickups-title").css("display", "none")

    $("#admin-update-reservation").css("display", "block")
    $("#admin-view-reservation").css("display", "none")

    loadPendingReservations();
})

$("#admin-today-pickups").click(function () {
    $("#admin-reservation-title").css("display", "none")
    $("#admin-todayPickups-title").css("display", "block")

    $("#admin-update-reservation").css("display", "none")
    $("#admin-view-reservation").css("display", "block")

    loadTodayPickUps()
})


var reservation_Id;
var data;


function loadPendingReservations() {
    $("#admin-reservation-table").empty();

    $.ajax({
        url: baseUrl + "/controller/reservation/pendingReservation",
        method: "GET",
        success: function (resp) {
            for (const reservation of resp.data) {
                let row = `<tr><td>${reservation.reserve_id}</td><td>${reservation.customer.nic}</td><td>${reservation.car.registration_no}</td>
                    <td>${reservation.no_of_days}</td></tr>`;
                $("#admin-reservation-table").append(row);
                $("#admin-reservation-table>tr").off("click");
                $("#admin-reservation-table>tr").click(function () {
                    reservation_Id = $(this).children(":eq(0)").text();
                    $("#admin-update-reservation").prop('disabled', false);
                    console.log(reservation_Id)
                });
            }
        }
    });
}

function loadTodayPickUps() {
    $("#admin-reservation-table").empty();

    $.ajax({
        url: baseUrl + "/controller/reservation/todayPickUps",
        method: "GET",
        success: function (resp) {
            for (const reservation of resp.data) {
                let row = `<tr><td>${reservation.reserve_id}</td><td>${reservation.customer.nic}</td><td>${reservation.car.registration_no}</td>
                    <td>${reservation.no_of_days}</td></tr>`;
                $("#admin-reservation-table").append(row);
                $("#admin-reservation-table>tr").off("click");
                $("#admin-reservation-table>tr").click(function () {
                    reservation_Id = $(this).children(":eq(0)").text();
                    $("#admin-view-reservation").prop('disabled', false);
                    $("#admin-update-reservation").prop('disabled', false);
                });
            }
        }
    });
}

$("#admin-view-reservation").click(function () {
    if (reservation_Id == null) {
        return
    }
    $.ajax({
        url: baseUrl + "controller/reservation/getReservation/" + reservation_Id,
        method: "GET",
        success: function (resp) {
            if (resp.status === 200) {
                data = resp.data
                setDataToViewReservationModal()
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
})

function setDataToViewReservationModal() {
    $("#admin-view-reservation-id").val(data.reserve_id)
    $("#admin-view-reservation-driverNic").val(data.driver)
    $("#admin-view-reservation-name").val(data.customer.nic)
    $("#admin-view-reservation-pickUpDate").val(data.pick_up_date)
    $("#admin-view-reservation-pickUpTime").val(data.pick_up_time)
    $("#admin-view-reservation-venue").val(data.pick_up_and_return_venue)
    $("#admin-view-reservation-returnDate").val(data.return_date)
    $("#admin-view-reservation-reserveDate").val(data.reserve_date)
    $("#admin-view-reservation-days").val(data.no_of_days)
    $("#admin-view-reservation-vehicle").val(data.car.registration_no)
    $("#admin-view-reservation-img").attr("src", baseUrl + data.bank_slip_img)

    if (data.driver_status === "YES") {
        getReservationDriver(data.reserve_id)
    } else {
        $("#admin-view-reservation-driverNic").val("Not Required");
    }
}

$("#admin-update-reservation").click(function () {
    if (reservation_Id == null) {
        return
    }
    $.ajax({
        url: baseUrl + "controller/reservation/getReservation/" + reservation_Id,
        method: "GET",
        success: function (resp) {
            if (resp.status === 200) {
                data = resp.data
                setDataToUpdateReservationModal(resp.data)
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
})

function setDataToUpdateReservationModal(data) {
    $("#admin-update-reservation-id").val(data.reserve_id)
    $("#admin-update-reservation-customer").val(data.customer.nic)
    $("#admin-update-reservation-pickUpDate").val(data.pick_up_date)
    $("#admin-update-reservation-pickUpTime").val(data.pick_up_time)
    $("#admin-update-reservation-venue").val(data.pick_up_and_return_venue)
    $("#admin-update-reservation-returnDate").val(data.return_date)
    $("#admin-update-reservation-reserveDate").val(data.reserve_date)
    $("#admin-update-reservation-vehicle").val(data.car.registration_no)
    $("#admin-update-reservation-img").attr("src", baseUrl + data.bank_slip_img)

    if (data.driver_status === "YES") {
        getReservationDriver(data.reserve_id)
    } else {
        $("#admin-update-reservation-driver").prop('disabled', true);
        $("#admin-update-reservation-driver").val("Not Required");
    }
}

function updateOrDenyReservation(id, status, driver) {
    console.log(id, status, driver)
    $.ajax({
        url: baseUrl + "controller/reservation?reserve_id=" + id + "&driver_id=" + driver + "&status=" + status,
        method: "PUT",
        success: function (resp) {
            if (resp.status === 200) {
                alert(resp.message)
                loadPendingReservations();
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
}

$("#btnAcceptReservation").click(function () {

    let driverField = $("#admin-update-reservation-driver").val();

    var regExDriverNic = /^[0-9]{12}\b|[0-9]{10}[V]$/;
    if (regExDriverNic.test(driverField)||driverField==="Not Required") {
        $("#admin-update-reservation-driver").css('border', '2px solid blue');
        if (data.driver_status === "YES") {
            var id = data.reserve_id;
            var status = "Accept"
            var driver = $("#admin-update-reservation-driver").val();
            updateOrDenyReservation(id, status, driver);
        } else {
            var id = data.reserve_id;
            var status = "Accept"
            var driver = "";
            updateOrDenyReservation(id, status, driver);
        }
        $("#updateReservationModel").modal("toggle");
    } else {
        $("#admin-update-reservation-driver").css('border', '2px solid red');
    }


})

$("#btnDenyReservation").click(function () {
    let res = confirm("Do you really need to Cancel this Reservation ?");
    if (res) {
        var id = data.reserve_id;
        var status = "Deny"
        var driver = "";
        updateOrDenyReservation(id, status, driver);
        $("#updateReservationModel").modal("toggle");
    }
})

function getReservationDriver(reserve_id) {
    $.ajax({
        url: baseUrl + "controller/driver/getSchedule/" + reserve_id,
        method: "GET",
        success: function (resp) {
            if (resp.status === 200) {
                $("#admin-view-reservation-driverNic").val(resp.data);
                $("#admin-update-reservation-driver").val(resp.data);
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
}
