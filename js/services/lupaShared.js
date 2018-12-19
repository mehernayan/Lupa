angular.module('lupaSharedProvider', [])
.factory('userData', function () {
    var user = {
        email: '',
        password:''
    };
    return {
        getUser: function () {
            return user;
        },
        setUser: function (email,password) {
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
        getUser: function () {
            return userReg;
        },
        setUser: function (name,email,phone,department,password,password_confirmation) {
            userReg.name = name;
            userReg.email = email;
            userReg.phone = phone;
            userReg.department = department;
            userReg.password = password;
            userReg.password_confirmation = password_confirmation;
            //console.log(userReg,"userReg");
        }
    };
});