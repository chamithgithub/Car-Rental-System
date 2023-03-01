
var baseUrl = "http://localhost:8080/Car_Rental_System/"

//-------------------- Login
$("#loginUserBtn").click(function () {

    // trail
    // $("#loginPage").css("display", "none")
    // $("#admin").css("display", "block")
    // $("#adminNavBar").css("display", "block")
    //
    // $("#adminDailySummary").css("display", "block")
    // $("#adminCars").css("display", "none")
    // $("#adminReservation").css("display", "none")
    // $("#adminDrivers").css("display", "none")
    // $("#adminCustomer").css("display", "none")
    // $("#adminPayments").css("display", "none")



    let userDTO = {
        user_name: $("#login-page-user-name").val(),
        password: $("#login-page-password").val()
    }

    $.ajax({
        url: "http://localhost:8080/Car_Rental_System/controller/login",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(userDTO),
        success: function (res) {
            if (res.status === 200) {
                if (res.message === ("Customer")) {
                    customerLogin(res.data)
                } else if (res.message === ("Driver")) {
                    driverLogin(res.data)
                } else if (res.message === ("Admin")) {
                    adminLogin(res.data)
                } else {
                    alert(res.message)
                }
            }
            $("#login-page-user-name").val("")
            $("#login-page-password").val("")
        },
        error: function (ob) {
            console.log(ob.responseJSON.message);
        }
    });

})


//-------------register page
$(".getStartBtn").click(function () {
    $("#homePage").css('display', 'none')
    $("#homeNavbar").css('display', 'none')
    $("#loginPage").css('display', 'none')

    $("#registerForm").css('display', 'block')

    // trail  customer
    //
    //  $("#homePage").css('display', 'none')
    //  $("#homeNavbar").css('display', 'none')
    //
    //
    //     $("#customerReservation").css("display", "none")
    //     $("#customerProfile").css("display", "none")
    //
    //     $("#customer").css("display", "block")
    // $("#customerNavbar").css("display", "block")



    // trail admin

    // $("#admin").css("display", "block")
    // $("#adminNavBar").css("display", "block")
    // $("#homePage").css("display", "none")
    // $("#homeNavbar").css("display", "none")
    //
    // $("#adminDailySummary").css("display", "block")
    // $("#adminCars").css("display", "none")
    // $("#adminReservation").css("display", "none")
    // $("#adminDrivers").css("display", "none")
    // $("#adminCustomer").css("display", "none")
    // $("#adminPayments").css("display", "none")


})

//-------------Back Btn in Login & Register Page
$(".backToHomeBtn").click(function () {
    $("#homePage").css('display', 'block')
    $("#homeNavbar").css('display', 'block')

    $("#loginPage").css('display', 'none')
    $("#registerForm").css('display', 'none')
})
//-------------login page------------
$("#loginFormBtn").click(function () {
    //


    $("#homePage").css('display', 'none')
    $("#homeNavbar").css('display', 'none')

    $("#loginPage").css('display', 'block')
})



//---------Customer Login
function customerLogin(data) {

    customer = data

    $("#loginPage").css("display", "none")
    $("#customer").css("display", "block")
    $("#customerNavbar").css("display", "block")

    $("#customer-profile-nic").val(data.nic)
    $("#customer-profile-name").val(data.customer_name)
    $("#customer-profile-email").val(data.email)
    $("#customer-profile-address").val(data.address)
    $("#customer-profile-mobile").val(data.mobile)


}

//---------Driver Login
function driverLogin(data) {

    $("#loginPage").css("display", "none")
    $("#driverNavBar").css("display", "block")
    $("#driver").css("display", "block")

    loadDriverSchedule(data);

}

//---------admin Login
function adminLogin(data) {

    $("#loginPage").css("display", "none")
    $("#homeNavbar").css("display", "none")
    $("#admin").css("display", "block")
    $("#adminNavBar").css("display", "block")

    $("#adminDailySummary").css("display", "block")
    $("#adminCars").css("display", "none")
    $("#adminReservation").css("display", "none")
    $("#adminDrivers").css("display", "none")
    $("#adminCustomer").css("display", "none")
    $("#adminPayments").css("display", "none")

}

//-------------admin profile nav
//--Dashboard
$("#adminDashboardBtn").click(function () {

    $("#adminDailySummary").css("display", "inline-flex")

    $("#adminReservation").css("display", "none")
    $("#adminCars").css("display", "none")
    $("#adminDrivers").css("display", "none")
    $("#adminCustomer").css("display", "none")
    $("#adminPayments").css("display", "none")


})

//--Reservation
$("#adminReservationBtn").click(function () {
    $("#adminReservation").css("display", "inline-flex")

    $("#adminDailySummary").css("display", "none")
    $("#adminCars").css("display", "none")
    $("#adminDrivers").css("display", "none")
    $("#adminCustomer").css("display", "none")
    $("#adminPayments").css("display", "none")

    $("#admin-reservation-title").css("display", "block")
    $("#admin-todayPickups-title").css("display", "none")

    $("#admin-update-reservation").css("display", "block")
    $("#admin-view-reservation").css("display", "none")


})

//--Cars
$("#adminCarsBtn").click(function () {
    $("#adminCars").css("display", "inline-flex")

    $("#adminReservation").css("display", "none")
    $("#adminDailySummary").css("display", "none")
    $("#adminDrivers").css("display", "none")
    $("#adminCustomer").css("display", "none")
    $("#adminPayments").css("display", "none")



    $("#availableBtn").css("display", "none");
    $("#unavailableBtn").css("display", "none");
    $("#maintainBtn").css("display", "none");
    $("#underMaintainBtn").css("display", "none");
    $("#viewButton").css("display", "block");


    $("#admin-all-cars-title").css("display", "block")
    $("#admin-all-unavailableCars-title").css("display", "none");
    $("#admin-all-needMaintains-title").css("display", "none");
    $("#admin-all-underMaintains-title").css("display", "none");
    $("#admin-all-availableCars-title").css("display", "none");

})

//--Customer
$("#adminCustomerBtn").click(function () {
    $("#adminCustomer").css("display", "inline-flex")

    $("#adminCars").css("display", "none")
    $("#adminReservation").css("display", "none")
    $("#adminDailySummary").css("display", "none")
    $("#adminDrivers").css("display", "none")
    $("#adminPayments").css("display", "none")

    loadAllCustomer()

})

//--Drivers
$("#adminDriversBtn").click(function () {
    $("#adminDrivers").css("display", "inline-flex")

    $("#adminCustomer").css("display", "none")
    $("#adminCars").css("display", "none")
    $("#adminReservation").css("display", "none")
    $("#adminDailySummary").css("display", "none")
    $("#adminPayments").css("display", "none")

    $("#admin-driver-schedule-table").css("display", "none")
    $("#admin-driver-table").css("display", "block")


    $("#admin-all-drivers-title").css("display", "block")
    $("#admin-all-driverSchedule-title").css("display", "none")

    $("#enableSaveDriverBtn").css("display", "block");
    $("#enableSearchDriverBtn").css("visibility", "hidden");

    loadAllDrivers()

})

//--Payment
$("#adminPaymentBtn").click(function () {
    $("#adminPayments").css("display", "inline-flex")

    $("#adminDrivers").css("display", "none")
    $("#adminCustomer").css("display", "none")
    $("#adminCars").css("display", "none")
    $("#adminReservation").css("display", "none")
    $("#adminDailySummary").css("display", "none")

    $("#admin-all-drivers-title").css("display", "block")
    $("#admin-all-driverSchedule-title").css("display", "none")


    $("#enableSaveDriverBtn").css("display", "block");
    $("#enableSearchDriverBtn").css("visibility", "hidden");

    loadAllDrivers()

})






//----------------customer page nav
//---Home
$("#customerHomeBtn").click(function () {
    $("#customerReservation").css("display", "none")
    $("#customerProfile").css("display", "none")

    $("#customerHome").css("display", "block")
})

//---Reserv
$("#customerReservationBtn").click(function () {

    $("#customerProfile").css("display", "none")
    $("#customerHome").css("display", "none")
    $("#customerReservation").css("display", "block")


})

//---Acc
$("#customerAccountBtn").click(function () {
    $("#customerHome").css("display", "none")
    $("#customerReservation").css("display", "none")

    $("#customerProfile").css("display", "block")
})

//---------------customer Profile navigations
$("#customerInformationBtn").click(function () {
    $("#customerProfileChangePassword").css("display", "none")

    $("#customerProfileUpdateDetail").css("display", "block")
})

$("#customerChangePasswordBtn").click(function () {
    $("#customerProfileChangePassword").css("display", "block")

    $("#customerProfileUpdateDetail").css("display", "none")
})









//----------User Logout
$("#logOutBtn").click(function () {

    $("#customer").css("display", "none")
    $("#customerNavbar").css("display", "none")

    $("#driverNavBar").css("display", "none")
    $("#driver").css("display", "none")

    $("#admin").css("display", "none")
    $("#adminNavBar").css("display", "none")

    $("#homePage").css("display", "block")
    $("#homeNavbar").css("display", "block")


})









