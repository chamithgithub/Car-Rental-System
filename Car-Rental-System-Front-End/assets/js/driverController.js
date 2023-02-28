var driver_nic;

$("#btnDriverSave").click(function () {
    driverSaveValidation()
})

function saveDriver() {
    var driverDTO = {
        nic: $("#save-driver-nic").val(),
        driver_name: $("#save-driver-name").val(),
        address: $("#save-driver-address").val(),
        license_no: $("#save-driver-license").val(),
        mobile: $("#save-driver-mobile").val(),
        join_date: $("#save-driver-date").val(),
        user_name: $("#save-driver-user-name").val(),
        password: $("#save-driver-password").val(),
    }

    $.ajax({
        url: baseUrl + "controller/driver/addDriver",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(driverDTO),
        success: function (res) {
            if (res.status === 200) {
                alert(res.message);
                loadAllDrivers()
            }
        },
        error: function (ob) {
            alert(ob.responseJSON.message);
            console.log(ob.responseJSON.message);
        }
    })
    clearDriverSaveForm()
}

function clearDriverSaveForm() {
    $('#save-driver-nic,#save-driver-name,#save-driver-address,#save-driver-license,#save-driver-mobile,#save-driver-date,#save-driver-user-name,#save-driver-password').css({
        border: '1px solid #c4c4c4',
    })
    $('#save-driver-nic,#save-driver-name,#save-driver-address,#save-driver-license,#save-driver-mobile,#save-driver-date,#save-driver-user-name,#save-driver-password').val("")
}

//222

$("#admin-driverBtn").click(function () {
    $("#admin-all-drivers-title").css("display", "block")
    $("#admin-all-driverSchedule-title").css("display", "none")

    $("#admin-driver-table").css("display", "block")
    $("#admin-driver-schedule-table").css("display", "none")

    $("#enableSaveDriverBtn").css("display", "block");
    $("#enableSearchDriverBtn").css("visibility", "hidden");
    $("#admin-driver-viewDetailsBtn").css("visibility", "visible");

    loadAllDrivers()
})

$("#admin-scheduleBtn").click(function () {
    $("#admin-all-drivers-title").css("display", "none")
    $("#admin-all-driverSchedule-title").css("display", "block")

    $("#admin-driver-table").css("display", "none")
    $("#admin-driver-schedule-table").css("display", "block")

    $("#enableSaveDriverBtn").css("display", "none");
    $("#enableSearchDriverBtn").css("visibility", "visible");

    $("#admin-driver-viewDetailsBtn").css("visibility", "hidden");

    $("#admin-driver-start-date").val(today);
    $("#admin-driver-end-date").val(today);

    loadDriverScheduleForAdmin();
})

$("#admin-driver-schedule-searchBtn").click(function () {
    loadDriverScheduleForAdmin()
})

function loadAllDrivers() {
    $("#admin-all-drivers-table").empty();

    $.ajax({
        url: baseUrl + "controller/driver/allDriverDetail",
        method: "GET",
        success: function (resp) {
            for (const driver of resp.data) {
                let row = `<tr><td>${driver.nic}</td><td>${driver.driver_name}</td><td>${driver.address}</td><td>${driver.mobile}</td><td>${driver.join_date}</td></tr>`;
                $("#admin-all-drivers-table").append(row);

                $("#admin-all-drivers-table>tr").off("click");
                $("#admin-all-drivers-table>tr").click(function () {
                    driver_nic = $(this).children(":eq(0)").text();
                    $("#admin-driver-viewDetailsBtn").prop('disabled', false);
                });
            }
        }
    });
}
