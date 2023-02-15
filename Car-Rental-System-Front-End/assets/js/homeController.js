

//-------------register page
$(".getStartBtn").click(function () {
    $("#homePage").css('display', 'none')
    $("#homeNavbar").css('display', 'none')
    $("#loginPage").css('display', 'none')

    $("#registerForm").css('display', 'block')
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
    // fff


    $("#homePage").css('display', 'none')
    $("#homeNavbar").css('display', 'none')

    $("#loginPage").css('display', 'block')
})












