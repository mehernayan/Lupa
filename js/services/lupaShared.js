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
}).factory('smtpData', function () {
    var smtpObj = {
        mail_driver : '',
        host : '',
        port : '',
        email : '',
        password : '',
        encryption_type : ''
    };
    return {
        get: function () {
            return smtpObj;
        },
        set: function (mail_driver,host,port,email,password,encryption_type) {
            smtpObj.mail_driver = mail_driver;
            smtpObj.host = host;
            smtpObj.port = port;
            smtpObj.email = email;
            smtpObj.password = password;
            smtpObj.encryption_type = encryption_type;
        }
    };
}).factory('smtpTestData', function () {
    var smtpEmail = {
        email : ''
    };
    return {
        get: function () {
            return smtpEmail;
        },
        set: function (email) {
           smtpEmail.email = email;
        }
    };
}).factory('purchaseData', function () {
    var purchaseObj = {
        software_name : '',
        year_of_purchase : new Date(),
        license_type : '',
        lease_months : 0,
        licenses_purchased : 0,
        purchase_cost : 0
    };
    return {
        get: function () {
            return purchaseObj;
        },
        set: function (software_name,year_of_purchase,license_type,lease_months,licenses_purchased,purchase_cost) {
            purchaseObj.software_name = software_name;
            purchaseObj.year_of_purchase = year_of_purchase;
            purchaseObj.license_type = license_type;
            purchaseObj.lease_months = lease_months;
            purchaseObj.licenses_purchased = licenses_purchased;
            purchaseObj.purchase_cost = purchase_cost;
        }
    };
}).factory('dynaCompData', function () {
    var dynaObj = {
        product_name : ''
    };
    return {
        get: function () {
            return dynaObj;
        },
        set: function (product_name) {
            dynaObj.product_name = product_name;
        }
    };
}).factory('dynaFeatureData', function () {
    var dynaFeatureObj = {
        features_lists : []
    };
    return {
        get: function () {
            return dynaFeatureObj;
        },
        set: function (features_lists) {
            dynaFeatureObj.features_lists = features_lists;
        }
    };
}).factory('notificationId', function () {
    var notificationId = {
        id : ''
    };
    return {
        get: function () {
            return notificationId;
        },
        set: function (id) {
            notificationId.id = id;
        }
    };
});