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

