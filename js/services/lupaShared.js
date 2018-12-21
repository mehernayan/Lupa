angular.module('lupaSharedProvider', [])
.factory('userData', function () {
    var user = {
        email: '',
        password:''
    };
    return {
        get: function () {
            return user;
        },
        set: function (email,password) {
            user.email = email;
            user.password = password;
        }
    };
}).factory('userRegData', function () {
    var userReg = {
        name : '',
        email : '',
        phone : '',
        department : '',
        password:'',
        password_confirmation: ''
    };
    return {
        get: function () {
            return userReg;
        },
        set: function (name,email,department,password,password_confirmation) {
            userReg.name = name;
            userReg.email = email;
            userReg.department = department;
            userReg.password = password;
            userReg.password_confirmation = password_confirmation;
            //console.log(userReg,"userReg");
        }
    };
}).factory('userRegOtpVal', function () {
    var otpVal = {
        otp: ''
    };
    return {
        get: function () {
            return otpVal;
        },
        set: function (otpval) {
            otpVal.otp = (otpval).toString();
        }
    };
}).factory('userEmailData', function () {
    var userEmail = {
        email: ''
    };
    return {
        get: function () {
            return userEmail;
        },
        set: function (email) {
            userEmail.email = email;
        }
    };
}).factory('userResetData', function () {
    var resetUser = {
        email : '',
        password : '',
        password_confirmation : ''
      };
    return {
        get: function () {
            return resetUser;
        },
        set: function (email,password,password_confirmation) {
            resetUser.email = email;
            resetUser.password = password;
            resetUser.password_confirmation = password_confirmation;
        }
    };
});