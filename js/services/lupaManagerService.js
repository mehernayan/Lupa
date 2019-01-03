var lupaManagerService = angular.module('lupaManagerProvider', ['lupaSharedProvider']);
lupaManagerService.service('lupaManagerService', ['$http', '$q','$filter','localStorageService','appConstants','userData','userRegData','userRegOtpVal','userEmailData','userResetData','deptProfileSettingData','transferUserData','dynaCompData','dynaFeatureData',
    function ($http, $q, $filter, localStorageService,appConstants,userData,userRegData,userRegOtpVal,userEmailData,userResetData,deptProfileSettingData,transferUserData,dynaCompData,dynaFeatureData) {

        
      
       /*
		 * fetch the department list
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
                    url : appConstants.serviceAddress+'/departmentmanager/login',
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
                url : appConstants.serviceAddress+'/departmentmanager/register',
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
                url : appConstants.serviceAddress+'/departmentmanager/otp',
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
                url : appConstants.serviceAddress+'/departmentmanager/password/email',
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
                url : appConstants.serviceAddress+'/departmentmanager/password/forgotpassword/otp',
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
                url : appConstants.serviceAddress+'/departmentmanager/password/reset',
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
        
        this.fetchUserProfileSettings = function() {
         var userLogged = null;
         if(localStorageService.get("user") !==null){
            userLogged = localStorageService.get("user")[0];
            var deferred = $q.defer();
            $http({
                method : 'GET',
                url : appConstants.serviceAddress+'/departmentmanager/profile_existing_data?id='+userLogged.id
            }).then(function(response) {
                deferred.resolve(response);
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
         }
        };

       /*
        * user update profile setting
        */
       
       this.updateProfileSettings = function() { 
        var userObj = deptProfileSettingData.get();
        var deferred = $q.defer();
        if(typeof userObj !== "undefined"){
            $http({
                method : 'POST',
                url : appConstants.serviceAddress+'/departmentmanager/profile',
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
		 * Fetch User List
		 */
        
        this.fetchUsersList = function() {
            var deferred = $q.defer();
            $http({
                method : 'GET',
                url : appConstants.serviceAddress+'/departmentmanager/users_list?department=CRASH'
            }).then(function(response) {
                deferred.resolve(response);
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        /*
		 * Block User
		 */
        
        this.blockUser = function(id) {
            var deferred = $q.defer();
            $http({
                method : 'GET',
                url : appConstants.serviceAddress+'/departmentmanager/userblock?id='+id
            }).then(function(response) {
                deferred.resolve(response);
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        /*
		 * Unblock User
		 */
        
        this.unBlockUser = function(id) {
            var deferred = $q.defer();
            $http({
                method : 'GET',
                url : appConstants.serviceAddress+'/departmentmanager/userunblock?id='+id
            }).then(function(response) {
                deferred.resolve(response);
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        
        /*
		 * Delete User
		 */
        
        this.deleteUser = function(id) {
            var deferred = $q.defer();
            $http({
                method : 'GET',
                url : appConstants.serviceAddress+'/departmentmanager/delete_user?id='+id
            }).then(function(response) {
                deferred.resolve(response);
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

         /*
		 * Fetch Department list to transfer user
		 */
        
        this.getTransDepartmentList = function() {
            var deferred = $q.defer();
            $http({
                method : 'GET',
                url : appConstants.serviceAddress+'/admin/departments_list'
            }).then(function(response) {
                deferred.resolve(response);
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        /**
         * Transfer User from department to to department
         */

        this.transferUser = function() { 
            var userObj = transferUserData.get();
            var deferred = $q.defer();
            if(typeof userObj !== "undefined"){
                $http({
                    method : 'POST',
                    url : appConstants.serviceAddress+'/departmentmanager/usertransfer',
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
		 * Fetch Product List
		 */
        
        this.fetchDynaProductList = function() {
            var deferred = $q.defer();
            $http({
                method : 'GET',
                url : appConstants.serviceAddress+'/departmentmanager/dyna_compare'
            }).then(function(response) {
                deferred.resolve(response);
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        /*
        * Get Features List
        */
       
       this.getFeaturesList = function() {
        var userObj = dynaCompData.get();
        var deferred = $q.defer();
        if(typeof userObj !== "undefined"){
            $http({
                method : 'POST',
                url : appConstants.serviceAddress+'/departmentmanager/get_features',
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
        * Post Features List
        */
       
       this.postFeaturesList = function() {
        var userObj = dynaFeatureData.get();
        var deferred = $q.defer();
        if(typeof userObj !== "undefined"){
            $http({
                method : 'POST',
                url : appConstants.serviceAddress+'/departmentmanager/final_list_features',
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
