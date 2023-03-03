

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


$("#btnCarSave").click(function () {
    saveCarValidation()
})

//----------Save Car
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

//-------------Load All Cars
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


var vehicle_no;
var carList;
var reservationId;
var reservationList;


$("#viewButton").click(function () {
    if (vehicle_no == null) {
        return
    }
    $.ajax({
        url: baseUrl + "controller/car/carDetail/" + vehicle_no,
        method: "GET",
        success: function (resp) {
            if (resp.status === 200) {
                setDataToUpdateModel(resp.data);
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
})

function setDataToUpdateModel(data) {
    $("#admin-update-registration-no").val(data.registration_no)
    $("#admin-update-brand").val(data.brand)
    $("#admin-update-type").val(data.type)
    $("#admin-update-transmission").val(data.transmission)
    $("#admin-update-color").val(data.color)
    $("#admin-update-passengers").val(data.no_of_passengers)
    $("#admin-update-mileage").val(data.mileage)
    $("#admin-update-fuel").val(data.fuel_type)
    $("#admin-update-daily").val(data.daily_rate)
    $("#admin-update-monthly").val(data.monthly_rate)
    $("#admin-update-freeKm-day").val(data.free_km_for_day)
    $("#admin-update-freeKn-month").val(data.free_km_for_month)
    $("#admin-update-extraKm").val(data.price_for_extra_km)
    $("#admin-update-waiverPayment").val(data.waiver_payment)
    $("#admin-update-status").val(data.status)
    $("#update-car-modal-front").attr("src", baseUrl + data.carImgDetail.image_1)
    $("#update-car-modal-back").attr("src", baseUrl + data.carImgDetail.image_2)
    $("#update-car-modal-side").attr("src", baseUrl + data.carImgDetail.image_3)
    $("#update-car-modal-interior").attr("src", baseUrl + data.carImgDetail.image_4)
}

$("#btnUpdateCar").click(function () {
    updateCarValidation()
})

$("#customer-upcoming-reservationBtn").click(function (){
    clearAllReservationDetails()
    loadUpcomingReservation()
})
$("#customer-pending-reservationBtn").click(function (){
    clearAllReservationDetails()
    loadPendingReservation()
})
function updateCar() {
    var data = new FormData();

    let front = $("#admin-update-front")[0].files[0];
    let frontFileName = front.name;

    let back = $("#admin-update-back")[0].files[0];
    let backFileName = back.name;

    let side = $("#admin-update-side")[0].files[0];
    let sideFileName = side.name;

    let interior = $("#admin-update-interior")[0].files[0];
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
        registration_no: $("#admin-update-registration-no").val(),
        brand: $("#admin-update-brand").val(),
        type: $("#admin-update-type").val(),
        transmission: $("#admin-update-transmission").val(),
        color: $("#admin-update-color").val(),
        no_of_passengers: $("#admin-update-passengers").val(),
        mileage: $("#admin-update-mileage").val(),
        fuel_type: $("#admin-update-fuel").val(),
        daily_rate: $("#admin-update-daily").val(),
        monthly_rate: $("#admin-update-monthly").val(),
        free_km_for_day: $("#admin-update-freeKm-day").val(),
        free_km_for_month: $("#admin-update-freeKn-month").val(),
        price_for_extra_km: $("#admin-update-extraKm").val(),
        waiver_payment: $("#admin-update-waiverPayment").val(),
        status: $("#admin-update-status").val(),
        carImgDetail: carImgDetailDTO,
    }

    data.append("car", new Blob([JSON.stringify(carDTO)], {type: "application/json"}));

    $.ajax({
        url: baseUrl + "controller/car/updateCarDetail",
        method: 'PUT',
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
            console.log(err);
        }
    });
    clearUpdateCarForm()
}

function clearUpdateCarForm() {
    $('#admin-update-registration-no,#admin-update-brand,#admin-update-type,#admin-update-transmission,#admin-update-color,#admin-update-passengers,#admin-update-mileage,#admin-update-fuel,#admin-update-daily,#admin-update-monthly,#admin-update-freeKm-day,#admin-update-freeKn-month,#admin-update-extraKm,#admin-update-waiverPayment,#admin-update-status,#admin-update-front,#admin-update-back,#admin-update-side,#admin-update-interior').css({
        border: '1px solid #c4c4c4',
    })
    $('#admin-update-registration-no,#admin-update-brand,#admin-update-type,#admin-update-transmission,#admin-update-color,#admin-update-passengers,#admin-update-mileage,#admin-update-fuel,#admin-update-daily,#admin-update-monthly,#admin-update-freeKm-day,#admin-update-freeKn-month,#admin-update-extraKm,#admin-update-waiverPayment,#admin-update-status,#admin-update-front,#admin-update-back,#admin-update-side,#admin-update-interior').val("")
}

function loadUpcomingReservationTable(data) {
    $("#customer-upcoming-reservation-table").empty();

    for (const reservation of data) {
        let row = `<tr><td>${reservation.reserve_id}</td></tr>`;
        $("#customer-upcoming-reservation-table").append(row);

        $("#customer-upcoming-reservation-table>tr").off("click");
        $("#customer-upcoming-reservation-table>tr").click(function () {
            reservationId = $(this).children(":eq(0)").text();
            setReservationData(reservationId);
        });
    }
}

function loadUpcomingReservation() {
    $.ajax({
        url: baseUrl + "controller/customer/customerReservationByStatus/?id=" + customer.nic + "&status=Accept",
        method: "GET",
        success: function (resp) {
            if (resp.status === 200) {
                if (!(resp.data.length === 0)) {
                    reservationList=resp.data
                    setReservationData(resp.data[0].reserve_id);
                    loadUpcomingReservationTable(resp.data)
                }
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function loadPendingReservation() {
    $.ajax({
        url: baseUrl + "controller/customer/customerReservationByStatus/?id=" + customer.nic + "&status=Pending",
        method: "GET",
        success: function (resp) {
            if (resp.status === 200) {
                if (!(resp.data.length === 0)) {
                    reservationList=resp.data
                    console.log(resp.data)
                    setReservationData(resp.data[0].reserve_id);
                    loadUpcomingReservationTable(resp.data)
                }
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function loadDriverInfo() {
    $.ajax({
        url: baseUrl + "controller/customer/sendDriverInfoForAcceptReservations/" + customer.nic,
        method: "GET",
        success: function (resp) {
            if (resp.status === 200) {
                if (!(resp.data.length === 0)) {
                    setDriverData(resp.data);
                }
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function setReservationData(data) {
    let obj = reservationList.find(o => o.reserve_id === data);

    if (obj.reservation_status==="Accept"){
        $("#customer-reservationStatus").text("ACTIVE")
        $("#customer-reservationStatus").css("color", "green")
    }else {
        $("#customer-reservationStatus").text("Pending")
        $("#customer-reservationStatus").css("color", "orange")
    }


    $("#customer-reservation-id").text(obj.reserve_id)
    $("#customer-reservation-name").text(obj.customer.customer_name)
    $("#customer-reservation-vehicle").text(obj.car.registration_no)
    $("#customer-reservation-venue").text(obj.pick_up_and_return_venue)
    $("#customer-reservation-pickUp-time").text(obj.pick_up_time)
    $("#customer-reservation-pickUp-date").text(obj.pick_up_date)
    $("#customer-reservation-return-date").text(obj.return_date)
    $("#customer-reservation-days").text(obj.no_of_days)

    loadDriverInfo()
}

function setDriverData(data) {

    let reserveId = $("#customer-reservation-id").text();
    let obj = data.find(o => o.carReservation.reserve_id === reserveId);
    console.log(obj)
    if (typeof obj !== 'undefined'){
        $("#driverStatus").text("YES")
        $("#customer-reservationStatus").css("color", "green")
        $("#driverStatus").css("color", "green")

        $("#customer-reservation-driver-id").text(obj.driver.nic)
        $("#customer-reservation-driver-name").text(obj.driver.driver_name)
        $("#customer-reservation-driver-license").text(obj.driver.license_no)
        $("#customer-reservation-driver-mobile").text(obj.driver.mobile)
        $("#customer-reservation-driver-joinDate").text(obj.driver.join_date)
    }else {
        $("#driverStatus").text("NO")
        $("#driverStatus").css("color", "red")
        $("#customer-reservation-driver-id,#customer-reservation-driver-name,#customer-reservation-driver-license,#customer-reservation-driver-mobile,#customer-reservation-driver-joinDate").text("")
    }
}

$("#unavailableBtn").click(function () {
    var status = "Unavailable";
    setCarStatus(vehicle_no, status)
    loadAllCars("unavailableOrAvailableCarsByStatus/Available")
})
$("#availableBtn").click(function () {
    var status = "Available";
    setCarStatus(vehicle_no, status)

    loadAllCars("unavailableOrAvailableCarsByStatus/Unavailable")
})
$("#maintainBtn").click(function () {
    var status = "UnderMaintain";
    setCarStatus(vehicle_no, status)
    loadAllCars("carsNeedMaintain")
})
$("#underMaintainBtn").click(function () {
    var status = "Available";
    setCarStatus(vehicle_no, status)
    loadAllCars("carsUnderMaintain")
})


function setCarStatus(id, status) {

    $.ajax({
        url: baseUrl + "controller/car?id=" + id + "&status=" + status,
        method: "PUT",
        async: false,
        success: function (res) {
            if (res.status === 200) {
                alert(res.message)
            }
        },
        error: function (ob) {
            console.log(ob);
            alert("Sorry Cant Update This Car Status Right Now..Try Again Latter")
        }
    });
}

$("#customer-searchCarBtn").click(function () {
    getAvailableCar();
})

function getAvailableCar() {
    var start_date = $("#customer-home-pickup").val()
    var end_date = $("#customer-home-return").val()

    $.ajax({
        url: baseUrl + "controller/car/availableOrRentalCarsByDate?pick_up_date=" + start_date + "&return_date=" + end_date + "&status=Available",
        method: 'GET',
        success: function (resp) {
            if (resp.status === 200) {
                carList = resp.data;
                setCarDetailsToHomeDiv()
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
}

let homeDivArray = ["#divOne", "#divTwo", "#divThree"];

var listNo = 0;
var displayDiv = 0;

function setCarDetailsToHomeDiv() {
    displayDiv = 0

    for (var i = 0; listNo <= carList.length - 1; i++, listNo++, displayDiv++) {
        $("#homeUnavailableTag").css("display", "none")
        $(homeDivArray[i]).css("display", "block")

        if (i > 2) {
            break
        }

        let img = "#" + $(homeDivArray[i]).children()[0].id
        let type = "#" + $(homeDivArray[i]).children().children()[0].id;
        let brand = "#" + $(homeDivArray[i]).children().children()[1].id;
        let daily = "#" + $(homeDivArray[i]).children().children()[4].id
        let monthly = "#" + $(homeDivArray[i]).children().children()[7].id

        let fuel = "#" + $("#" + $(homeDivArray[i]).children().children()[9].id).children()[1].id;
        let transmission = "#" + $("#" + $(homeDivArray[i]).children().children()[10].id).children()[1].id;

        let car_id = "#" + $(homeDivArray[i]).children().children()[12].id

        $(img).attr("src", baseUrl + carList[listNo].carImgDetail.image_1)
        $(type).text(carList[listNo].type)
        $(brand).text(carList[listNo].brand)
        $(daily).text(carList[listNo].daily_rate)
        $(monthly).text(carList[listNo].monthly_rate)
        $(fuel).text(carList[listNo].fuel_type)
        $(transmission).text(carList[listNo].transmission)
        $(car_id).text(carList[listNo].registration_no)

    }
}

$("#card-one-bookBtn").click(function () {
    let id = $("#card-one-car-id").text();
    let obj = carList.find(o => o.registration_no === id);
    setCarDetailsToModal(obj)

})
$("#card-two-bookBtn").click(function () {
    let id = $("#card-two-car-id").text();
    let obj = carList.find(o => o.registration_no === id);
    setCarDetailsToModal(obj)

})
$("#card-three-bookBtn").click(function () {
    let id = $("#card-three-car-id").text();
    let obj = carList.find(o => o.registration_no === id);
    setCarDetailsToModal(obj)

})

$("#customer-home-nextCarBtn").click(function () {
    if (carList.length === listNo) {
        return
    }
    $('#divOne, #divTwo,#divThree').css({
        display: 'none'
    })

    setCarDetailsToHomeDiv()

})
$("#customer-home-previousCarBtn").click(function () {
    if (3 >= listNo) {
        return
    }
    $('#divOne, #divTwo,#divThree').css({
        display: 'none'
    })
    listNo = listNo - (displayDiv + 3)
    setCarDetailsToHomeDiv()
})

function getReservationId() {
    $.ajax({
        url: baseUrl + "controller/reservation/generateReservationId",
        method: "GET",
        success: function (resp) {
            if (resp.status === 200) {
                $("#customer-reservation-reserve-id").val(resp.data)
            }
        },
        error: function (ob) {
            console.log(ob);
        }
    });

}

function setCarDetailsToModal(obj) {
    getReservationId()
    $("#customer-reservation-car-id").text(obj.registration_no)
    $("#customer-reservation-car-brand").text(obj.brand)
    $("#customer-reservation-car-color").text(obj.color)
    $("#customer-reservation-car-type").text(obj.color)
    $("#customer-reservation-car-extraKm").text(obj.price_for_extra_km)
    $("#customer-reservation-car-freeKmDay").text(obj.free_km_for_day)
    $("#customer-reservation-car-freeKmMonth").text(obj.free_km_for_month)
    $("#customer-reservation-car-fuel").text(obj.fuel_type)
    $("#customer-reservation-car-waiverPayment").text(obj.waiver_payment)
    $("#customer-reservation-car-transmission").text(obj.transmission)
    $("#customer-reservation-car-monthly").text(obj.monthly_rate)
    $("#customer-reservation-car-passengers").text(obj.no_of_passengers)
    $("#customer-reservation-car-mileage").text(obj.mileage)
    $("#customer-reservation-car-daily").text(obj.daily_rate)
    $("#customer-reservation-car-img1").attr("src", baseUrl + obj.carImgDetail.image_1)
    $("#customer-reservation-car-img2").attr("src", baseUrl + obj.carImgDetail.image_2)
    $("#customer-reservation-car-img3").attr("src", baseUrl + obj.carImgDetail.image_3)
    $("#customer-reservation-car-img4").attr("src", baseUrl + obj.carImgDetail.image_4)

    var date1 = $("#customer-home-pickup").val();
    var date2 = $("#customer-home-return").val()

    var diff = Math.floor((Date.parse(date2) - Date.parse(date1)) / 86400000);

    $("#customer-reservation-customer-days").val(diff)
    $("#customer-reservation-customer-name").val(customer.customer_name)
    $("#customer-reservation-customer-vehicle-no").val(obj.registration_no)
    $("#customer-reservation-customer-returnDate").val(date2)
    $("#customer-reservation-customer-pickUpDate").val(date1)

    $("#customer-reservation-customer-pickUpTime").text()
    $("#customer-reservation-customer-driverCheck").text()
}

function saveReservation() {
    var data = new FormData();

    let slip_img = $("#slip-image")[0].files[0];
    let slipFileName = slip_img.name;

    data.append("file", slip_img);

    var driver_status;
    if ($('#customer-reservation-customer-driverCheck').is(":checked")) {
        driver_status = "YES"
    } else {
        driver_status = "NO"
    }

    let reservation = {
        reserve_id: $("#customer-reservation-reserve-id").val(),
        reserve_date: today,
        pick_up_date: $("#customer-reservation-customer-pickUpDate").val(),
        return_date: $("#customer-reservation-customer-returnDate").val(),
        pick_up_time: $("#customer-reservation-customer-pickUpTime").val(),
        pick_up_and_return_venue: $("#customer-reservation-customer-venue").val(),
        no_of_days: $("#customer-reservation-customer-days").val(),
        bank_slip_img: slipFileName,
        reservation_status: "Pending",
        driver_status: driver_status,
        customer: {
            nic: customer.nic
        },
        car: {
            registration_no: $("#customer-reservation-car-id").text()
        },
    }
    data.append("reservation", new Blob([JSON.stringify(reservation)], {type: "application/json"}));


    $.ajax({
        url: baseUrl + "controller/reservation",
        method: 'post',
        async: true,
        contentType: false,
        processData: false,
        data: data,
        success: function (resp) {
            console.log(resp.data)
            alert(resp.message);
            listNo=0;
            getAvailableCar();
            $("#bookNowModel").modal("toggle");
        },
        error: function (err) {
            console.log(err);
            getAvailableCar();
        }
    });

    $('#customer-reservation-customer-venue,#slip-image').css({
        border: '1px solid #c4c4c4'
    })
    $('#customer-reservation-customer-venue,#slip-image').val("")
}

$("#btnReservationSave").click(function () {
    reservationValidation()
})

$("#btnDeleteCar").click(function (){
    let res = confirm("Delete this Car ?");
    if (res) {
        $("#updateCarModel").modal("toggle");
        loadAllCars("allCarDetail");
        clearUpdateCarForm();
    }
})