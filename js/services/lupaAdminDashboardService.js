var lupaAdminDashboardService = angular.module('lupaAdminDashboardProvider', ['lupaSharedProvider']);
lupaAdminDashboardService.service('lupaAdminDashboardService', ['$http', '$q','$filter','localStorageService','appConstants','userData', '$rootScope',
    function ($http, $q, $filter, localStorageService,appConstants,userData, $rootScope) {
        //console.log(userData);
        //console.log(localStorageService.get("user")[0].id);
        //debugger;

        this.changeGraphUrl = function(chart_duration, chart_type, statistics_type) {
        
        //$scope.userLogged = localStorageService.get("user");
        var userObj = {"username": "training", "product_name" : "LSDYNA", "type": statistics_type, "chart_type" : chart_type}
        var deferred = $q.defer();
        $rootScope.url= appConstants.serviceAddress+'/user/'+chart_duration+'_licenses_used';
        
        $http({
                    method : 'POST',
                    url : $rootScope.url,
                    data : userObj
                }).then(function(response) {
                    deferred.resolve(response);
                }, function(error) {
                    deferred.reject(error);
                });
                return deferred.promise;
           
        
        
       };
       this.addFavouriteUrl = function(report_type, chart_type, statisticsType) {
        var  user_id = localStorageService.get("user")[0].id;
        var product_name = "LSDYNA";

        var userObj = {"user_id": user_id, "product_name" : product_name,"report_type" : report_type, "chart_type" :chart_type, "statistics_type": statisticsType,  "favorite" : 1, "role" : "user", "api": $rootScope.url}
        //$scope.userLogged = localStorageService.get("user");
        console.log("user obj", userObj);
        //debugger;
        var deferred = $q.defer();
        $http({
                    method : 'POST',
                    url : appConstants.serviceAddress+'/add_favorites',
                    data : userObj
                }).then(function(response) {
                    deferred.resolve(response);
                }, function(error) {
                    deferred.reject(error);
                });
                return deferred.promise;
           
        
        
       };
       this.getFavouriteUrl = function() {
        //var  user_id = localStorageService.get("user")[0].id;
        //var userObj = {"user_id": user_id,"role" : "user"};
        var userObj = {"user_id": "28","role" : "user"};
        //$scope.userLogged = localStorageService.get("user");
        var deferred = $q.defer();
        $http({
                    method : 'POST',
                    url : appConstants.serviceAddress+'/get_favourites',
                    data : userObj
                }).then(function(response) {
                    deferred.resolve(response);
                }, function(error) {
                    deferred.reject(error);
                });
                return deferred.promise;
           
        
        
       };
       this.getRecentReportUrl = function() {
        var  user_id = localStorageService.get("user")[0].id;
        var userObj = {"user_id": 26,"role" : "user"}
        //$scope.userLogged = localStorageService.get("user");
        var deferred = $q.defer();
        $http({
                    method : 'POST',
                    url : appConstants.serviceAddress+'/get_recent_reports',
                    data : userObj
                }).then(function(response) {
                    deferred.resolve(response);
                }, function(error) {
                    deferred.reject(error);
                });
                return deferred.promise;
           
        
        
       };
       this.getLastFiveMinutesReportUrl = function(product_name) {
        //$scope.userLogged = localStorageService.get("user");
        var userObj = {"username": "training","product_name" : product_name}
        var deferred = $q.defer();
        $http({
                    method : 'POST',
                    url : appConstants.serviceAddress+'/user/last_five_minutes',
                    data : userObj
                }).then(function(response) {
                    deferred.resolve(response);
                }, function(error) {
                    deferred.reject(error);
                });
                return deferred.promise;
           
        
        
       };
        this.getTodayReportUrl = function(product_name) {
        //$scope.userLogged = localStorageService.get("user");
        var userObj = {"username": "training","product_name" : product_name}
        var deferred = $q.defer();
        $http({
                    method : 'POST',
                    url : appConstants.serviceAddress+'/user/todays_data',
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