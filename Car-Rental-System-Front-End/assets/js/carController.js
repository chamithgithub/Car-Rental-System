var vehicle_no;
var carList;



function saveCar() {

    var data = new FormData();

    let front = $("#save-car-frontView")[0].files[0];
    let frontFileName = front.name;

    let back = $("#save-car-backView")[0].files[0];
    let backFileName = back.name;

    let side = $("#save-car-sideView")[0].files[0];
    let sideFileName = side.name;

    let interior = $("#save-car-interior")[0].files[0];
    let interiorFileName = interior.name;

    data.append("file", front);
    data.append("file", back);
    data.append("file", side);
    data.append("file", interior);


    var carImgDetailDTO = {
        image_1: frontFileName,
        image_2: backFileName,
        image_3: sideFileName,
        image_4: interiorFileName,
    }

    var carDTO = {
        registration_no: $("#save-car-registration-no").val(),
        brand: $("#save-car-brand").val(),
        type: $("#save-car-type").val(),
        transmission: $("#save-car-transmission").val(),
        color: $("#save-car-color").val(),
        no_of_passengers: $("#save-car-passengers").val(),
        mileage: $("#save-car-mileage").val(),
        fuel_type: $("#save-car-fuelType").val(),
        daily_rate: $("#save-car-daily").val(),
        monthly_rate: $("#save-car-monthly").val(),
        free_km_for_day: $("#save-car-freeKm-day").val(),
        free_km_for_month: $("#save-car-freeKm-month").val(),
        price_for_extra_km: $("#save-car-extraKm-price").val(),
        waiver_payment: $("#save-car-waiver-payment").val(),
        status: $("#save-car-status").val(),
        carImgDetail: carImgDetailDTO,
    }

    data.append("car", new Blob([JSON.stringify(carDTO)], {type: "application/json"}));

    $.ajax({
        url: baseUrl + "controller/car/addNewCar",
        method: 'post',
        async: true,
        contentType: false,
        processData: false,
        data: data,
        success: function (resp) {
            if (resp.status === 200) {
                alert(resp.message);
                loadAllCars("allCarDetail");

            }
        },
        error: function (err) {
            alert(err.resposeJSON.message);
            console.log(err);
        }
    });
    clearSaveCarForm();
}

function clearSaveCarForm() {
    $('#save-car-registration-no,#save-car-brand,#save-car-type,#save-car-transmission,#save-car-color,#save-car-passengers,#save-car-mileage,#save-car-fuelType,#save-car-daily,#save-car-monthly,#save-car-freeKm-day,#save-car-freeKm-month,#save-car-extraKm-price,#save-car-waiver-payment,#save-car-status,#save-car-frontView,#save-car-backView,#save-car-sideView,#save-car-interior').css({
        border: '1px solid #c4c4c4',
    })
    $('#save-car-registration-no,#save-car-brand,#save-car-type,#save-car-transmission,#save-car-color,#save-car-passengers,#save-car-mileage,#save-car-fuelType,#save-car-daily,#save-car-monthly,#save-car-freeKm-day,#save-car-freeKm-month,#save-car-extraKm-price,#save-car-waiver-payment,#save-car-status,#save-car-frontView,#save-car-backView,#save-car-sideView,#save-car-interior').val("")

    $("#save-car-type,#save-car-transmission,#save-car-status,#save-car-fuelType").val("Select One")
}

$("#btnCarSave").click(function () {
    saveCarValidation()
})
$("#admin-car-available").click(function () {
    $("#unavailableBtn").css("display", "block");

    $("#maintainBtn").css("display", "none");
    $("#underMaintainBtn").css("display", "none");
    $("#availableBtn").css("display", "none");
    $("#viewButton").css("display", "none");

    $("#admin-all-cars-title").css("display", "none");
    $("#admin-all-unavailableCars-title").css("display", "none");
    $("#admin-all-needMaintains-title").css("display", "none");
    $("#admin-all-underMaintains-title").css("display", "none");
    $("#admin-all-availableCars-title").css("display", "block");

    loadAllCars("unavailableOrAvailableCarsByStatus/Available")


})
$("#admin-car-unavailable").click(function () {
    $("#availableBtn").css("display", "block");

    $("#unavailableBtn").css("display", "none");
    $("#maintainBtn").css("display", "none");
    $("#underMaintainBtn").css("display", "none");
    $("#viewButton").css("display", "none");

    $("#admin-all-cars-title").css("display", "none");
    $("#admin-all-unavailableCars-title").css("display", "block");
    $("#admin-all-needMaintains-title").css("display", "none");
    $("#admin-all-underMaintains-title").css("display", "none");
    $("#admin-all-availableCars-title").css("display", "none");

    loadAllCars("unavailableOrAvailableCarsByStatus/Unavailable")

})
$("#admin-car-underMaintain").click(function () {
    $("#availableBtn").css("display", "block");

    $("#unavailableBtn").css("display", "none");
    $("#maintainBtn").css("display", "none");
    $("#underMaintainBtn").css("display", "none");
    $("#viewButton").css("display", "none");

    $("#admin-all-cars-title").css("display", "none");
    $("#admin-all-unavailableCars-title").css("display", "none");
    $("#admin-all-needMaintains-title").css("display", "none");
    $("#admin-all-underMaintains-title").css("display", "block");
    $("#admin-all-availableCars-title").css("display", "none");

    loadAllCars("carsUnderMaintain")

})

$("#admin-car-needMaintain").click(function () {
    $("#maintainBtn").css("display", "block");

    $("#availableBtn").css("display", "none");
    $("#unavailableBtn").css("display", "none");
    $("#underMaintainBtn").css("display", "none");
    $("#viewButton").css("display", "none");

    $("#admin-all-cars-title").css("display", "none");
    $("#admin-all-unavailableCars-title").css("display", "none");
    $("#admin-all-needMaintains-title").css("display", "block");
    $("#admin-all-underMaintains-title").css("display", "none");
    $("#admin-all-availableCars-title").css("display", "none");


    loadAllCars("carsNeedMaintain")
})

//------Load All Cars
function loadAllCars(path) {
    $("#admin-cars-table").empty();

    $.ajax({
        url: baseUrl + "controller/car/" + path,
        method: "GET",
        success: function (resp) {
            for (const car of resp.data) {
                let row = `<tr><td>${car.registration_no}</td><td>${car.brand}</td><td>${car.type}</td><td>${car.transmission}</td><td>${car.fuel_type}</td></tr>`;
                $("#admin-cars-table").append(row);

                $("#admin-cars-table>tr").off("click");
                $("#admin-cars-table>tr").click(function () {
                    vehicle_no = $(this).children(":eq(0)").text();
                    $("#viewButton").prop('disabled', false);
                });
            }
        }
    });
}