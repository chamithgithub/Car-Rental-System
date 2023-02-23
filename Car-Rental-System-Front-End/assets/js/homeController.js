
var baseUrl = "http://localhost:8080/Car_Rental_System/"

//-------------------- Login
$("#loginUserBtn").click(function () {

    // trail
    $("#homeNavbar").css('display', 'block')
        $("#loginPage").css("display", "none")
        $("#admin").css("display", "block")

        $("#adminDailySummary").css("display", "none")
        $("#adminCars").css("display", "none")
        $("#adminReservation").css("display", "none")
        $("#adminDrivers").css("display", "none")
        $("#adminCustomer").css("display", "none")
        $("#adminPayments").css("display", "block")




    // let userDTO = {
    //     user_name: $("#login-page-user-name").val(),
    //     password: $("#login-page-password").val()
    // }
    //
    // $.ajax({
    //     url: "http://localhost:8080/Car_Rental_System/controller/login",
    //     method: "POST",
    //     contentType: "application/json",
    //     data: JSON.stringify(userDTO),
    //     success: function (res) {
    //         if (res.status === 200) {
    //             if (res.message === ("Customer")) {
    //                 customerLogin(res.data)
    //             } else if (res.message === ("Driver")) {
    //                 driverLogin(res.data)
    //             } else if (res.message === ("Admin")) {
    //                 adminLogin(res.data)
    //             } else {
    //                 alert(res.message)
    //             }
    //         }
    //         $("#login-page-user-name").val("")
    //         $("#login-page-password").val("")
    //     },
    //     error: function (ob) {
    //         console.log(ob.responseJSON.message);
    //     }
    // });
})


//-------------register page
$(".getStartBtn").click(function () {
    // $("#homePage").css('display', 'none')
    // $("#homeNavbar").css('display', 'none')
    // $("#loginPage").css('display', 'none')
    //
    // $("#registerForm").css('display', 'block')

    // trail
     $("#homePage").css('display', 'none')
    $("#homeNavbar").css('display', 'block')
    $("#loginPage").css("display", "none")
    $("#admin").css("display", "block")

    $("#adminDailySummary").css("display", "block")
    $("#adminCars").css("display", "none")
    $("#adminReservation").css("display", "none")
    $("#adminDrivers").css("display", "none")
    $("#adminCustomer").css("display", "none")
    $("#adminPayments").css("display", "none")
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


}













