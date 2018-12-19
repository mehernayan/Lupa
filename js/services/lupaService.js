var lupaService = angular.module('lupaProvider', ['lupaSharedProvider']);
lupaService.service('lupaService', ['$http', '$q','$filter','localStorageService','appConstants','userData','userRegData','adminData',
    function ($http, $q, $filter, localStorageService,appConstants,userData,userRegData,adminData) {

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
