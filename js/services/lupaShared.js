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
        set: function (name,email,phone,department,password,password_confirmation) {
            userReg.name = name;
            userReg.email = email;
            userReg.phone = phone;
            userReg.department = department;
            userReg.password = password;
            userReg.password_confirmation = password_confirmation;
            //console.log(userReg,"userReg");
        }
    };
}).factory('adminData', function () {
    var adminReg = {
        email : '',
        password:''
    };
    return {
        get: function () {
            return adminReg;
        },
        set: function (email,password) {
            adminReg.email = email;
            adminReg.password = password;
        }
    };
});