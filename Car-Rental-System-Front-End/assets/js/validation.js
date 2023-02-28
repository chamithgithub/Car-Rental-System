
// customer

var regExCusName = /^[A-z.\s]{3,50}$/;
var regExCusAddress = /^[A-z\s+]{5,50}$/;
var regExCusNic = /^[0-9]{12}\b|[0-9]{10}[V]$/;
var regExCusMobile = /^(07)([125678])(-?)[0-9]{7}$/;
var regExCusEmail = /^[a-z0-9]{4,20}[@][a-z]{3,6}(.com|.lk)$/;

// driver
var regExDriverName = /^[A-z.\s]{3,50}$/;
var regExDriverAddress = /^[A-z\s+]{5,50}$/;
var regExDriverNic = /^[0-9]{12}\b|[0-9]{10}[V]$/;
var regExDriverMobile = /^(07)([125678])(-?)[0-9]{7}$/;
var regExLicense = /^[B][0-9]{7}$/

// vehicle
var regExVehicleNo = /^[A-Z]{3}[-][0-9]{4}\b|[0-9]{3}[-][0-9]{4}$/
var regExBrand = /^[A-z.\s]{3,10}$/
var regExType = /^[A-z.\s]{3,10}$/
var regExTransmission = /^[A-z.\s]{3,10}$/
var regExColor = /^[A-z.\s]{3,10}$/
var regExPassengers = /^[0-9]{1,2}$/
var regExMileage = /^[0-9]{1,7}$/
var regExFuel = /^[A-z.\s]{3,10}$/
var regExDaily = /^[0-9]{1,6}$/
var regExMonthly = /^[0-9]{1,6}$/
var regExFreeKmDay = /^[0-9]{1,4}$/
var regExFreeKmMonth = /^[0-9]{1,4}$/
var regExExtraKmPrice = /^[0-9]{1,6}$/
var regExWaiverPayment = /^[0-9]{1,6}$/
var regExStatus = /^[A-z.\s]{3,15}$/
var regExVenue = /^[A-z\s+]{5,50}$/



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

function driverSaveValidation() {

    let nic = $("#save-driver-nic").val();
    let name = $("#save-driver-name").val();
    let address = $("#save-driver-address").val();
    let license = $("#save-driver-license").val();
    let mobile = $("#save-driver-mobile").val();
    let date = $("#save-driver-date").val();
    let user_name = $("#save-driver-user-name").val();
    let password = $("#save-driver-password").val();

    if (regExDriverNic.test(nic)) {
        $("#save-driver-nic").css('border', '2px solid blue');
        if (regExDriverName.test(name)) {
            $("#save-driver-name").css('border', '2px solid blue');
            if (regExDriverAddress.test(address)) {
                $("#save-driver-address").css('border', '2px solid blue');
                if (regExLicense.test(license)) {
                    $("#save-driver-license").css('border', '2px solid blue');
                    if (regExDriverMobile.test(mobile)) {
                        $("#save-driver-mobile").css('border', '2px solid blue');
                        if (date.length !== 0) {
                            $("#save-driver-date").css('border', '2px solid blue');
                            if (user_name.length !== 0) {
                                $("#save-driver-user-name").css('border', '2px solid blue');
                                if (password.length !== 0) {
                                    $("#save-driver-password").css('border', '2px solid blue');
                                    saveDriver()

                                } else {
                                    $("#save-driver-password").css('border', '2px solid red');
                                }
                            } else {
                                $("#save-driver-user-name").css('border', '2px solid red');
                            }
                        } else {
                            $("#save-driver-date").css('border', '2px solid red');
                        }
                    } else {
                        $("#save-driver-mobile").css('border', '2px solid red');
                    }
                } else {
                    $("#save-driver-license").css('border', '2px solid red');
                }
            } else {
                $("#save-driver-address").css('border', '2px solid red');
            }
        } else {
            $("#save-driver-name").css('border', '2px solid red');
        }
    } else {
        $("#save-driver-nic").css('border', '2px solid red');
    }
}

function driverUpdateValidation() {

    let name = $("#admin-update-driver-name").val();
    let address = $("#admin-update-driver-address").val();
    let license = $("#admin-update-driver-license").val();
    let mobile = $("#admin-update-driver-mobile").val();
    let user_name = $("#admin-update-driver-userName").val();
    let password = $("#admin-update-driver-password").val();

    if (regExDriverName.test(name)) {
        $("#admin-update-driver-name").css('border', '2px solid blue');
        if (regExDriverAddress.test(address)) {
            $("#admin-update-driver-address").css('border', '2px solid blue');
            if (regExLicense.test(license)) {
                $("#admin-update-driver-license").css('border', '2px solid blue');
                if (regExDriverMobile.test(mobile)) {
                    $("#admin-update-driver-mobile").css('border', '2px solid blue');
                    if (user_name.length !== 0) {
                        $("#admin-update-driver-userName").css('border', '2px solid blue');
                        if (password.length !== 0) {
                            $("#admin-update-driver-password").css('border', '2px solid blue');
                            updateDriver()
                        } else {
                            $("#admin-update-driver-password").css('border', '2px solid red');
                        }
                    } else {
                        $("#admin-update-driver-userName").css('border', '2px solid red');
                    }
                } else {
                    $("#admin-update-driver-mobile").css('border', '2px solid red');
                }
            } else {
                $("#admin-update-driver-license").css('border', '2px solid red');
            }
        } else {
            $("#admin-update-driver-address").css('border', '2px solid red');
        }
    } else {
        $("#admin-update-driver-name").css('border', '2px solid red');
    }
}

function saveCarValidation() {
    let registration_no = $("#save-car-registration-no").val();
    let brand = $("#save-car-brand").val();
    let type = $("#save-car-type").val();
    let transmission = $("#save-car-transmission").val();
    let color = $("#save-car-color").val();
    let passengers = $("#save-car-passengers").val();
    let mileage = $("#save-car-mileage").val();
    let fuel = $("#save-car-fuelType").val();
    let daily = $("#save-car-daily").val();
    let monthly = $("#save-car-monthly").val();
    let freeKmDay = $("#save-car-freeKm-day").val();
    let freeKmMonth = $("#save-car-freeKm-month").val();
    let extraKmPrice = $("#save-car-extraKm-price").val();
    let waiverPayment = $("#save-car-waiver-payment").val();
    let status = $("#save-car-status").val();

    let frontView = $("#save-car-frontView")[0].files.length;
    let backView = $("#save-car-backView")[0].files.length;
    let sideView = $("#save-car-sideView")[0].files.length;
    let interior = $("#save-car-interior")[0].files.length;


    if (regExVehicleNo.test(registration_no)) {
        $("#save-car-registration-no").css('border', '2px solid blue');
        if (regExBrand.test(brand)) {
            $("#save-car-brand").css('border', '2px solid blue');
            if (regExType.test(type)) {
                $("#save-car-type").css('border', '2px solid blue');
                if (regExTransmission.test(transmission)) {
                    $("#save-car-transmission").css('border', '2px solid blue');
                    if (regExColor.test(color)) {
                        $("#save-car-color").css('border', '2px solid blue');
                        if (regExPassengers.test(passengers)) {
                            $("#save-car-passengers").css('border', '2px solid blue');
                            if (regExMileage.test(mileage)) {
                                $("#save-car-mileage").css('border', '2px solid blue');
                                if (regExFuel.test(fuel)) {
                                    $("#save-car-fuelType").css('border', '2px solid blue');
                                    if (regExDaily.test(daily)) {
                                        $("#save-car-daily").css('border', '2px solid blue');
                                        if (regExMonthly.test(monthly)) {
                                            $("#save-car-monthly").css('border', '2px solid blue');
                                            if (regExFreeKmDay.test(freeKmDay)) {
                                                $("#save-car-freeKm-day").css('border', '2px solid blue');
                                                if (regExFreeKmMonth.test(freeKmMonth)) {
                                                    $("#save-car-freeKm-month").css('border', '2px solid blue');
                                                    if (regExExtraKmPrice.test(extraKmPrice)) {
                                                        $("#save-car-extraKm-price").css('border', '2px solid blue');
                                                        if (regExWaiverPayment.test(waiverPayment)) {
                                                            $("#save-car-waiver-payment").css('border', '2px solid blue');
                                                            if (regExStatus.test(status)) {
                                                                $("#save-car-status").css('border', '2px solid blue');
                                                                if (frontView !== 0) {
                                                                    $("#save-car-frontView").css('border', '2px solid blue');
                                                                    if (backView !== 0) {
                                                                        $("#save-car-backView").css('border', '2px solid blue');
                                                                        if (sideView !== 0) {
                                                                            $("#save-car-sideView").css('border', '2px solid blue');
                                                                            if (interior !== 0) {
                                                                                $("#save-car-interior").css('border', '2px solid blue');
                                                                                saveCar()
                                                                            } else {
                                                                                $("#save-car-interior").css('border', '2px solid red');
                                                                            }
                                                                        } else {
                                                                            $("#save-car-sideView").css('border', '2px solid red');
                                                                        }
                                                                    } else {
                                                                        $("#save-car-backView").css('border', '2px solid red');
                                                                    }
                                                                } else {
                                                                    $("#save-car-frontView").css('border', '2px solid red');
                                                                }
                                                            } else {
                                                                $("#save-car-status").css('border', '2px solid red');
                                                            }
                                                        } else {
                                                            $("#save-car-waiver-payment").css('border', '2px solid red');
                                                        }
                                                    } else {
                                                        $("#save-car-extraKm-price").css('border', '2px solid red');
                                                    }
                                                } else {
                                                    $("#save-car-freeKm-month").css('border', '2px solid red');
                                                }
                                            } else {
                                                $("#save-car-freeKm-day").css('border', '2px solid red');
                                            }
                                        } else {
                                            $("#save-car-monthly").css('border', '2px solid red');
                                        }
                                    } else {
                                        $("#save-car-daily").css('border', '2px solid red');
                                    }

                                } else {
                                    $("#save-car-fuelType").css('border', '2px solid red');
                                }
                            } else {
                                $("#save-car-mileage").css('border', '2px solid red');
                            }

                        } else {
                            $("#save-car-passengers").css('border', '2px solid red');
                        }

                    } else {
                        $("#save-car-color").css('border', '2px solid red');
                    }
                } else {
                    $("#save-car-transmission").css('border', '2px solid red');
                }
            } else {
                $("#save-car-type").css('border', '2px solid red');
            }
        } else {
            $("#save-car-brand").css('border', '2px solid red');
        }
    } else {
        $("#save-car-registration-no").css('border', '2px solid red');
    }
}

function updateCarValidation() {
    let registration_no = $("#admin-update-registration-no").val();
    let brand = $("#admin-update-brand").val();
    let type = $("#admin-update-type").val();
    let transmission = $("#admin-update-transmission").val();
    let color = $("#admin-update-color").val();
    let passengers = $("#admin-update-passengers").val();
    let mileage = $("#admin-update-mileage").val();
    let fuel = $("#admin-update-fuel").val();
    let daily = $("#admin-update-daily").val();
    let monthly = $("#admin-update-monthly").val();
    let freeKmDay = $("#admin-update-freeKm-day").val();
    let freeKmMonth = $("#admin-update-freeKn-month").val();
    let extraKmPrice = $("#admin-update-extraKm").val();
    let waiverPayment = $("#admin-update-waiverPayment").val();
    let status = $("#admin-update-status").val();

    // img


    let frontView = $("#admin-update-front")[0].files.length;
    let backView = $("#admin-update-back")[0].files.length;
    let sideView = $("#admin-update-side")[0].files.length;
    let interior = $("#admin-update-interior")[0].files.length;



    if (regExVehicleNo.test(registration_no)) {
        $("#admin-update-registration-no").css('border', '2px solid blue');
        if (regExBrand.test(brand)) {
            $("#admin-update-brand").css('border', '2px solid blue');
            if (regExType.test(type)) {
                $("#admin-update-type").css('border', '2px solid blue');
                if (regExTransmission.test(transmission)) {
                    $("#admin-update-transmission").css('border', '2px solid blue');
                    if (regExColor.test(color)) {
                        $("#admin-update-color").css('border', '2px solid blue');
                        if (regExPassengers.test(passengers)) {
                            $("#admin-update-passengers").css('border', '2px solid blue');
                            if (regExMileage.test(mileage)) {
                                $("#admin-update-mileage").css('border', '2px solid blue');
                                if (regExFuel.test(fuel)) {
                                    $("#admin-update-fuel").css('border', '2px solid blue');
                                    if (regExDaily.test(daily)) {
                                        $("#admin-update-daily").css('border', '2px solid blue');
                                        if (regExMonthly.test(monthly)) {
                                            $("#admin-update-monthly").css('border', '2px solid blue');
                                            if (regExFreeKmDay.test(freeKmDay)) {
                                                $("#admin-update-freeKm-day").css('border', '2px solid blue');
                                                if (regExFreeKmMonth.test(freeKmMonth)) {
                                                    $("#admin-update-freeKn-month").css('border', '2px solid blue');
                                                    if (regExExtraKmPrice.test(extraKmPrice)) {
                                                        $("#admin-update-extraKm").css('border', '2px solid blue');
                                                        if (regExWaiverPayment.test(waiverPayment)) {
                                                            $("#admin-update-waiverPayment").css('border', '2px solid blue');
                                                            if (regExStatus.test(status)) {
                                                                $("#admin-update-status").css('border', '2px solid blue');
                                                                if (frontView !== 0) {
                                                                    $("#admin-update-front").css('border', '2px solid blue');
                                                                    if (backView !== 0) {
                                                                        $("#admin-update-back").css('border', '2px solid blue');
                                                                        if (sideView !== 0) {
                                                                            $("#admin-update-side").css('border', '2px solid blue');
                                                                            if (interior !== 0) {
                                                                                $("#admin-update-interior").css('border', '2px solid blue');
                                                                                updateCar();
                                                                            } else {
                                                                                $("#admin-update-interior").css('border', '2px solid red');
                                                                            }
                                                                        } else {
                                                                            $("#admin-update-side").css('border', '2px solid red');
                                                                        }
                                                                    } else {
                                                                        $("#admin-update-back").css('border', '2px solid red');
                                                                    }
                                                                } else {
                                                                    $("#admin-update-front").css('border', '2px solid red');
                                                                }
                                                            } else {
                                                                $("#admin-update-status").css('border', '2px solid red');
                                                            }
                                                        } else {
                                                            $("#admin-update-waiverPayment").css('border', '2px solid red');
                                                        }
                                                    } else {
                                                        $("#admin-update-extraKm").css('border', '2px solid red');
                                                    }
                                                } else {
                                                    $("#admin-car-").css('border', '2px solid red');
                                                }
                                            } else {
                                                $("#admin-update-freeKn-month").css('border', '2px solid red');
                                            }
                                        } else {
                                            $("#admin-update-monthly").css('border', '2px solid red');
                                        }
                                    } else {
                                        $("#admin-update-daily").css('border', '2px solid red');
                                    }
                                } else {
                                    $("#admin-update-fuel").css('border', '2px solid red');
                                }
                            } else {
                                $("#admin-update-mileage").css('border', '2px solid red');
                            }
                        } else {
                            $("#admin-update-passengers").css('border', '2px solid red');
                        }

                    } else {
                        $("#admin-update-color").css('border', '2px solid red');
                    }
                } else {
                    $("#admin-update-transmission").css('border', '2px solid red');
                }
            } else {
                $("#admin-update-type").css('border', '2px solid red');
            }
        } else {
            $("#admin-update-brand").css('border', '2px solid red');
        }
    } else {
        $("#admin-update-registration-no").css('border', '2px solid red');
    }
}


function reservationValidation() {
    let venue = $("#customer-reservation-customer-venue").val();

    if (regExVenue.test(venue)) {
        $("#customer-reservation-customer-venue").css('border', '2px solid blue');
        if ($("#slip-image")[0].files.length !== 0) {
            $("#slip-image").css('border', '2px solid blue');
            saveReservation()
        } else {
            $("#slip-image").css('border', '2px solid red');
        }
    } else {
        $("#customer-reservation-customer-venue").css('border', '2px solid red');
    }
}


function totalCalculateValidation() {
    var regExDamage = /^[0-9][0-9]*([.][0-9]{2})?$/
    var regExTotal = /^[0-9]{1,4}$/

    let totalKm = $("#admin-payment-totalKm").val();
    let damage = $("#admin-payment-damage-cost").val();

    if (regExTotal.test(totalKm)) {
        $("#admin-payment-totalKm").css('border', '2px solid blue');
        if (regExDamage.test(damage)) {
            $("#admin-payment-damage-cost").css('border', '2px solid blue');
            calculateTotal()
        } else {
            $("#admin-payment-damage-cost").css('border', '2px solid red');
        }
    } else {
        $("#admin-payment-totalKm").css('border', '2px solid red');
    }
}
