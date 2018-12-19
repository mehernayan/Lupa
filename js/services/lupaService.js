var lupaService = angular.module('lupaProvider', ['lupaSharedProvider']);
lupaService.service('lupaService', ['$http', '$q','$filter','localStorageService','appConstants','userData','userRegData',
    function ($http, $q, $filter, localStorageService,appConstants,userData,userRegData) {

       /*
        * login detail
        */
       
        this.loginUser = function() {
            var userObj = userData.getUser();
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
        * login detail
        */
       
       this.registerUser = function() {
        var userObj = userRegData.getUser();
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
       
    }]);
