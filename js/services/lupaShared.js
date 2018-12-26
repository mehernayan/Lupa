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
}).factory('profileSettingData', function () {
    var profileData = {
        id : '',
        email : '',
        npassword : '',
        ncpassword : ''
      };
    return {
        get: function () {
            return profileData;
        },
        set: function (id,email,npassword,ncpassword) {
            profileData.id = id;
            profileData.email = email;
            profileData.npassword = npassword;
            profileData.ncpassword = ncpassword;
        }
    };
}).factory('deptProfileSettingData', function () {
    var profileData = {
        id : '',
        name : '',
        email : '',
        password : '',
        cpassword : ''
      };
    return {
        get: function () {
            return profileData;
        },
        set: function (id,name,email,password,cpassword) {
            profileData.id = id;
            profileData.name = name;
            profileData.email = email;
            profileData.password = password;
            profileData.cpassword = cpassword;
        }
    };
}).factory('adminProfileSettingData', function () {
    var profileData = {
        id : '',
        name : '',
        email : '',
        password : '',
        password_confirmation : ''
      };
    return {
        get: function () {
            return profileData;
        },
        set: function (id,name,email,password,password_confirmation) {
            profileData.id = id;
            profileData.name = name;
            profileData.email = email;
            profileData.password = password;
            profileData.password_confirmation = password_confirmation;
        }
    };
}).factory('addDepartmentData', function () {
    var departmentData = {
        department : ''
      };
    return {
        get: function () {
            return departmentData;
        },
        set: function (department) {
            departmentData.department = department;
        }
    };
}).factory('transferUserData', function () {
    var transferUserData = {
        todepartment : '',
        useremail : '',
        fromdepartment : '',
        username : ''
    };
    return {
        get: function () {
            return transferUserData;
        },
        set: function (todepartment,useremail,fromdepartment,username) {
            transferUserData.todepartment = todepartment;
            transferUserData.useremail = useremail;
            transferUserData.fromdepartment = fromdepartment;
            transferUserData.username = username;
        }
    };
});