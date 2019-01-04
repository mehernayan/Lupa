var lupaUserDashboardService = angular.module('lupaUserDashboardProvider', ['lupaSharedProvider']);
lupaUserDashboardService.service('lupaUserDashboardService', ['$http', '$q','$filter','localStorageService','appConstants','userData',
    function ($http, $q, $filter, localStorageService,appConstants,userData) {

        this.changeGraphUrl = function() {
        var userObj = {"username": "training", "product_name" : "LSDYNA", "type": "license_statistics", "chart_type" :"vertical_bar_chart"}
        //$scope.userLogged = localStorageService.get("user");
        var deferred = $q.defer();
        $http({
                    method : 'POST',
                    url : appConstants.serviceAddress+'/user/yearly_licenses_used',
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