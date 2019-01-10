var lupaUserDashboardService = angular.module('lupaUserDashboardProvider', ['lupaSharedProvider']);
lupaUserDashboardService.service('lupaUserDashboardService', ['$http', '$q','$filter','localStorageService','appConstants','userData',
    function ($http, $q, $filter, localStorageService,appConstants,userData) {

        this.changeGraphUrl = function(chart_duration, chart_type, statistics_type) {
        var userObj = {"username": "training", "product_name" : "LSDYNA", "type": statistics_type, "chart_type" : chart_type}
        //$scope.userLogged = localStorageService.get("user");
        var deferred = $q.defer();
        $http({
                    method : 'POST',
                    url : appConstants.serviceAddress+'/user/'+chart_duration+'_licenses_used',
                    data : userObj
                }).then(function(response) {
                    deferred.resolve(response);
                }, function(error) {
                    deferred.reject(error);
                });
                return deferred.promise;
           
        
        
       };

       /* this.fetchUserDeptList = function() {
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
        };*/

      
}]);