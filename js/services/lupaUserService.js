var lupaUserService = angular.module('lupaUserProvider', ['lupaSharedProvider']);
lupaUserService.service('lupaUserService', ['$http', '$q','$filter','localStorageService','appConstants','userData','userRegData','userRegOtpVal','userEmailData','userResetData',
    function ($http, $q, $filter, localStorageService,appConstants,userData,userRegData,userRegOtpVal,userEmailData,userResetData) {

        
       /*
		 * fetch the user department list
		 */
        this.fetchUserDeptList = function() {
            var deferred = $q.defer();
            $http({
                method : 'GET',
                url : appConstants.serviceAddress+'/user/registration_page_data'
            }).then(function(response) {
                deferred.resolve(response);
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

       /*
		 * fetch the elastic URL
		 */
        this.fetchDeptList = function() {
            var deferred = $q.defer();
            $http({
                method : 'GET',
                url : appConstants.serviceAddress+'/departmentmanager/department_types'
            }).then(function(response) {
                deferred.resolve(response);
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };
        /*
        * user login detail
        */
       
        this.loginUser = function() {
            var userObj = userData.get();
            var deferred = $q.defer();
            if(typeof userObj !== "undefined"){
                $http({
                    method : 'POST',
                    url : appConstants.serviceAddress+'/user/login',
                    data : userObj
                }).then(function(response) {
                    deferred.resolve(response);
                }, function(error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            }
        };

        /*
        * user register detail
        */
       
       this.registerUser = function() { 
        var userObj = userRegData.get();
        var deferred = $q.defer();
        if(typeof userObj !== "undefined"){
            $http({
                method : 'POST',
                url : appConstants.serviceAddress+'/user/register',
                data : userObj
            }).then(function(response) {
                deferred.resolve(response);
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }
       };

       /*
        * user otp detail
        */
       
       this.userRegOtp = function() { 
        var userObj = userRegOtpVal.get();
        var deferred = $q.defer();
        if(typeof userObj !== "undefined"){
            $http({
                method : 'POST',
                url : appConstants.serviceAddress+'/user/otp',
                data : userObj
            }).then(function(response) {
                deferred.resolve(response);
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }
       };

       /*
        * user forgor password detail
        */
       
       this.getUserForgotPasswordOtp = function() { 
        var userObj = userEmailData.get();
        var deferred = $q.defer();
        if(typeof userObj !== "undefined"){
            $http({
                method : 'POST',
                url : appConstants.serviceAddress+'/user/password/email',
                data : userObj
            }).then(function(response) {
                deferred.resolve(response);
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }
       };

        /*
        * password otp detail
        */
       
       this.validateUserForgotPasswordOtp = function() { 
        var userObj = userRegOtpVal.get();
        var deferred = $q.defer();
        if(typeof userObj !== "undefined"){
            $http({
                method : 'POST',
                url : appConstants.serviceAddress+'/user/password/forgotpassword/otp',
                data : userObj
            }).then(function(response) {
                deferred.resolve(response);
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }
       };

       /*
        * reset password detail
        */
       
       this.resetUserPassword = function() { 
        var userObj = userResetData.get();
        var deferred = $q.defer();
        if(typeof userObj !== "undefined"){
            $http({
                method : 'POST',
                url : appConstants.serviceAddress+'/user/password/reset',
                data : userObj,
            }).then(function(response) {
                deferred.resolve(response);
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }
       };
    /*
    * admin login detail
    */
       
       this.loginAdmin = function() { 
        var userObj = adminData.get();
        var deferred = $q.defer();
        if(typeof userObj !== "undefined"){
            $http({
                method : 'POST',
                url : appConstants.serviceAddress+'/admin/login',
                data : userObj
            }).then(function(response) {
                deferred.resolve(response);
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }
       };
       
    }]);
