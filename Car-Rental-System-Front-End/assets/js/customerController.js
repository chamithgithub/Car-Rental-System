
// //----------------customer page nav
// //---Home
// $("#customerHomeBtn").click(function () {
//     $("#customerReservation").css("display", "none")
//     $("#customerProfile").css("display", "none")
//
//     $("#customerHome").css("display", "block")
// })

var customer;
var customer_nic;

$("#registerNowBtn").click(function () {
    registerFormValidation()
})

function registerCustomer() {
    var data = new FormData();

    let nic = $("#register-form-NIC-image")[0].files[0];
    let nicFileName = nic.name;
    let license = $("#register-form-License-image")[0].files[0];
    let licenseFileName = license.name;

    data.append("file", nic);
    data.append("file", license);

    let customerDTO = {
        nic: $("#register-form-nic").val(),
        user_name: $("#register-form-user-name").val(),
        password: $("#register-form-password").val(),
        customer_name: $("#register-form-name").val(),
        address: $("#register-form-address").val(),
        mobile: $("#register-form-mobile").val(),
        email: $("#register-form-email").val(),
        register_date: $("#register-form-date").val(),
        nic_img: nicFileName,
        license_img: licenseFileName,

    }
    data.append("customer", new Blob([JSON.stringify(customerDTO)], {type: "application/json"}));

    $.ajax({
        url: baseUrl + "controller/customer/register",
        method: 'post',
        async: true,
        contentType: false,
        processData: false,
        data: data,
        success: function (resp) {
            alert(resp.message);
            if (!(resp.data == null)) {
                openCustomerHome(resp.data)
                getAvailableCar();
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
    cleanRegisterForm()
}

function cleanRegisterForm() {
    $('#register-form-name,#register-form-nic,#register-form-email,#register-form-mobile, #register-form-address,#register-form-user-name ,#register-form-password, #register-form-NIC-image, #register-form-License-image').css({
        border: '1px solid gray',
    })
    $('#register-form-name,#register-form-nic,#register-form-email,#register-form-mobile, #register-form-address,#register-form-user-name ,#register-form-password, #register-form-NIC-image, #register-form-License-image').val("")

}

function openCustomerHome(data) {
    $("#registerForm").css("display", "none")

    $("#customer").css("display", "block")
    $("#customerNavbar").css("display", "block")

    $("#customer-profile-nic").val(data.nic)
    $("#customer-profile-name").val(data.user_name)
    $("#customer-profile-email").val(data.email)
    $("#customer-profile-address").val(data.address)
    $("#customer-profile-mobile").val(data.mobile)
}

function loadAllCustomer() {
    $("#admin-customer-table").empty();

    $.ajax({
        url: baseUrl + "controller/customer/allCustomerDetail",
        method: "GET",
        success: function (resp) {
            for (const customer of resp.data) {
                let row = `<tr><td>${customer.nic}</td><td>${customer.user_name}</td><td>${customer.address}</td><td>${customer.mobile}</td>
                <td>${customer.register_date}</td></tr>`;
                $("#admin-customer-table").append(row);

                $("#admin-customer-table>tr").off("click");
                $("#admin-customer-table>tr").click(function () {
                    customer_nic = $(this).children(":eq(0)").text();
                    $("#admin-customer-viewBtn").prop('disabled', false);
                });
            }
        }
    });
}

function setDataToViewCustomerModal(data) {
    $("#admin-view-customer-nic").val(data.nic)
    $("#admin-view-customer-address").val(data.address)
    $("#admin-view-customer-email").val(data.email)
    $("#admin-view-customer-mobile").val(data.mobile)
    $("#admin-view-customer-name").val(data.customer_name)
    $("#admin-view-customer-registerDate").val(data.register_date)
    $("#admin-view-customer-imgOne").attr("src", baseUrl + data.nic_img)
    $("#admin-view-customer-imgTwo").attr("src", baseUrl + data.license_img)
}

$("#admin-customer-viewBtn").click(function () {
    if (customer_nic == null) {
        return
    }
    $.ajax({
        url: baseUrl + "controller/customer/customerDetail/" + customer_nic,
        method: "GET",
        success: function (resp) {
            if (resp.status === 200) {
                setDataToViewCustomerModal(resp.data);
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
})

$("#btnChangePassword").click(function () {

    var newPassword = $("#customer-profile-new-password").val()

    let userDTO = {
        user_name: customer.user_name,
        password: $("#customer-profile-current-password").val(),
    }

    $.ajax({
        url: baseUrl + "controller/login",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(userDTO),
        success: function (res) {
            if (res.status === 200) {
                if (res.message === ("Customer")) {
                    changePassword(customer.nic, customer.user_name, newPassword);
                } else {
                    alert("Current Password not match")
                }
            }
        },
        error: function (ob) {
            console.log(ob.responseJSON.message);
        }
    });
})

function changePassword(nic, user_name, newPassword) {
    user = {
        customer_id: nic,
        user_name: user_name,
        password: newPassword
    }

    $.ajax({
        url: baseUrl + "controller/customer/accountSecurity",
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(user),
        success: function (res) {
            if (res.status === 200) {
                alert(res.message)
            } else {
                alert("not update your password")
            }
        },
        error: function (ob) {
            console.log(ob.responseJSON.message);
        }
    });
}

$("#customer-updateBtn").click(function () {
    customerUpdateValidation()
})

function updateCustomer() {
    var newDetails = {
        nic: $("#customer-profile-nic").val(),
        user_name: customer.user_name,
        password: customer.password,
        customer_name: $("#customer-profile-name").val(),
        license_img: customer.license_img,
        nic_img: customer.nic_img,
        address: $("#customer-profile-address").val(),
        mobile: $("#customer-profile-mobile").val(),
        email: $("#customer-profile-email").val(),
        register_date: customer.register_date
    }

    $.ajax({
        url: baseUrl + "controller/customer/update",
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(newDetails),
        success: function (res) {
            if (res.status === 200) {
                alert(res.message)
            } else {
                alert("not update your Details")
            }
        },
        error: function (ob) {
            console.log(ob.responseJSON.message);
        }
    });
}

// // ---------------card div generate
//
// let divArray = ["#div-one", "#div-two", "#div-three"];
//
// function loadDataToDiv2() {
//
//     displayDiv = 0
//     for (var i = 0; listNo <= carList.length - 1; i++, listNo++, displayDiv++) {
//
//         $("#tag").css("display", "none")
//         $(divArray[i]).css("display", "block")
//
//         if (i > 2) {
//             break
//         }
//         let img = "#" + $(divArray[i]).children()[0].id
//         let type = "#" + $(divArray[i]).children().children()[0].id;
//         let brand = "#" + $(divArray[i]).children().children()[1].id;
//         let daily = "#" + $(divArray[i]).children().children()[4].id
//         let monthly = "#" + $(divArray[i]).children().children()[7].id
//
//         let fuel = "#" + $("#" + $(divArray[i]).children().children()[9].id).children()[1].id;
//         let transmission = "#" + $("#" + $(divArray[i]).children().children()[10].id).children()[1].id;
//
//         $(img).attr("src", baseUrl + carList[listNo].carImgDetail.image_1)
//         $(type).text(carList[listNo].type)
//         $(brand).text(carList[listNo].brand)
//         $(daily).text(carList[listNo].daily_rate)
//         $(monthly).text(carList[listNo].monthly_rate)
//         $(fuel).text(carList[listNo].fuel_type)
//         $(transmission).text(carList[listNo].transmission)
//     }
//
// }
// $("#customer-home-nextCarBtn").click(function () {
//     if (carList.length === listNo) {
//         return
//     }
//     $('#div-one, #div-two,#div-three,#div-four').css({
//         display: 'none'
//     })
//
//     loadDataToDiv2()
//
// })
//
// $("#customer-home-previousCarBtn").click(function () {
//     if (4 >= listNo) {
//         return
//     }
//     $('#div-one, #div-two,#div-three,#div-four').css({
//         display: 'none'
//     })
//     listNo = listNo - (displayDiv + 3)
//     loadDataToDiv2()
// })

$('#register-form-date').val(today);
$('#customer-home-pickup').val(today);

