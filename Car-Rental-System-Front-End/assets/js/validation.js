var regExCusName = /^[A-z.\s]{3,50}$/;
var regExCusAddress = /^[A-z\s+]{5,50}$/;
var regExCusNic = /^[0-9]{12}\b|[0-9]{10}[V]$/;
var regExCusMobile = /^(07)([125678])(-?)[0-9]{7}$/;
var regExCusEmail = /^[a-z0-9]{4,20}[@][a-z]{3,6}(.com|.lk)$/;

function registerFormValidation() {

    let name = $("#register-form-name").val();
    let nic = $("#register-form-nic").val();
    let email = $("#register-form-email").val();
    let address = $("#register-form-address").val();
    let mobile = $("#register-form-mobile").val();

    let userName = $("#register-form-user-name").val();
    let password = $("#register-form-password").val();

    let nicLength = $("#register-form-NIC-image")[0].files.length;
    let licenseLenght = $("#register-form-License-image")[0].files.length;


    if (regExCusName.test(name)) {
        $("#register-form-name").css('border', '2px solid blue');
        if (regExCusNic.test(nic)) {
            $("#register-form-nic").css('border', '2px solid blue');
            if (regExCusEmail.test(email)) {
                $("#register-form-email").css('border', '2px solid blue');
                if (regExCusMobile.test(mobile)) {
                    $("#register-form-mobile").css('border', '2px solid blue');
                    if (regExCusAddress.test(address)) {
                        $("#register-form-address").css('border', '2px solid blue');
                        if (userName.length !== 0) {
                            $("#register-form-user-name").css('border', '2px solid blue');
                            if (password.length !== 0) {
                                $("#register-form-password").css('border', '2px solid blue');
                                if (nicLength !== 0) {
                                    $("#register-form-NIC-image").css('border', '2px solid blue');
                                    if (licenseLenght !== 0) {
                                        $("#register-form-License-image").css('border', '2px solid blue');
                                        registerCustomer()
                                    } else {
                                        $("#register-form-License-image").css('border', '2px solid red');
                                    }
                                } else {
                                    $("#register-form-NIC-image").css('border', '2px solid red');
                                }
                            } else {
                                $("#register-form-password").css('border', '2px solid red');
                            }
                        } else {
                            $("#register-form-user-name").css('border', '2px solid red');
                        }
                    } else {
                        $("#register-form-address").css('border', '2px solid red');
                    }
                } else {
                    $("#register-form-mobile").css('border', '2px solid red');
                }
            } else {
                $("#register-form-email").css('border', '2px solid red');
            }
        } else {
            $("#register-form-nic").css('border', '2px solid red');
        }
    } else {
        $("#register-form-name").css('border', '2px solid red');
    }
}

function customerUpdateValidation() {
    let name = $("#customer-profile-name").val();
    let email = $("#customer-profile-email").val();
    let mobile = $("#customer-profile-mobile").val();
    let address = $("#customer-profile-address").val();

    if (regExCusName.test(name)) {
        $("#customer-profile-name").css('border', '2px solid blue');
        if (regExCusEmail.test(email)) {
            $("#customer-profile-email").css('border', '2px solid blue');
            if (regExCusMobile.test(mobile)) {
                $("#customer-profile-mobile").css('border', '2px solid blue');
                if (regExCusAddress.test(address)) {
                    $("#customer-profile-address").css('border', '2px solid blue');
                    updateCustomer();
                } else {
                    $("#customer-profile-address").css('border', '2px solid red');
                }
            } else {
                $("#customer-profile-mobile").css('border', '2px solid red');
            }
        } else {
            $("#customer-profile-email").css('border', '2px solid red');
        }
    } else {
        $("#customer-profile-name").css('border', '2px solid red');
    }
}
