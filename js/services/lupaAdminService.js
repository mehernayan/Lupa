var lupaAdminService = angular.module('lupaAdminProvider', ['lupaSharedProvider']);
lupaAdminService.service('lupaAdminService', ['$http', '$q','$filter','localStorageService','appConstants','userData','userRegData','userRegOtpVal','userEmailData','userResetData','adminProfileSettingData','addDepartmentData',
    function ($http, $q, $filter, localStorageService,appConstants,userData,userRegData,userRegOtpVal,userEmailData,userResetData,adminProfileSettingData,addDepartmentData) {

        
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

       /*
        * user forgor password detail
        */
       
       this.getUserForgotPasswordOtp = function() { 
        var userObj = userEmailData.get();
        var deferred = $q.defer();
        if(typeof userObj !== "undefined"){
            $http({
                method : 'POST',
                url : appConstants.serviceAddress+'/admin/password/email',
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
                url : appConstants.serviceAddress+'/admin/password/forgotpassword/otp',
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
                url : appConstants.serviceAddress+'/admin/password/reset',
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
		 * fetch the user profile details
		 */
        var userLogged = null;
        if(localStorageService.get("user") !==null){
            userLogged = localStorageService.get("user")[0];
        }
        this.fetchUserProfileSettings = function() {
            var deferred = $q.defer();
            $http({
                method : 'GET',
                url : appConstants.serviceAddress+'/admin/profile_existing_data?id='+userLogged.id
            }).then(function(response) {
                deferred.resolve(response);
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

       /*
        * user update profile setting
        */
       
       this.updateProfileSettings = function() { 
        var userObj = adminProfileSettingData.get();
        var deferred = $q.defer();
        if(typeof userObj !== "undefined"){
            $http({
                method : 'POST',
                url : appConstants.serviceAddress+'/admin/profileupdate',
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
		 * fetch department lists
		 */
        
        this.fetchDepartmentList = function() {
            var deferred = $q.defer();
            $http({
                method : 'GET',
                url : appConstants.serviceAddress+'/admin/totaldepartments_list'
            }).then(function(response) {
                deferred.resolve(response);
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };
        
        /*
        * add department 
        */
       
       this.addDepartment = function() { 
        var userObj = addDepartmentData.get();
        var deferred = $q.defer();
        if(typeof userObj !== "undefined"){
            $http({
                method : 'POST',
                url : appConstants.serviceAddress+'/admin/deptAdd',
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
		 * Delete department from lists
		 */
        
        this.delteDepartment = function(id) {
            var deferred = $q.defer();
            $http({
                method : 'GET',
                url : appConstants.serviceAddress+'/admin/deptDestroy?id='+id
            }).then(function(response) {
                deferred.resolve(response);
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };
       
}]);
