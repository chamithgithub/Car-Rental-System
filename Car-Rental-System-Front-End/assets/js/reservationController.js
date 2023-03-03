var reservation_Id;
var data;

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


