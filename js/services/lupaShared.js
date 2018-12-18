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
            this.user.email = email;
            this.user.password = password;
        }
    };
});