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
            console.log(user,"user");
        }
    };
});