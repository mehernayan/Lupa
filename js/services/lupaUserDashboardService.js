var lupaUserDashboardService = angular.module('lupaUserDashboardProvider', ['lupaSharedProvider']);
lupaUserDashboardService.service('lupaUserDashboardService', ['$http', '$q','$filter','localStorageService','appConstants','userData', '$rootScope',
    function ($http, $q, $filter, localStorageService,appConstants,userData, $rootScope) {
        //console.log(userData);
        //console.log(localStorageService.get("user")[0].id);
        //debugger;
        var product_name = localStorageService.get("product_name");
        if(product_name == "" || product_name == "undefined" || product_name == null) {
            product_name = "LSDYNA"
        }
        this.changeGraphUrl = function(chart_duration, chart_type, statistics_type, current_prod) {
        product_name = localStorageService.get("product_name");
        //$scope.userLogged = localStorageService.get("user");
        var userLogged = localStorageService.get("user")[0].name;
        var userObj = {"username": userLogged, "product_name" : current_prod, "type": statistics_type, "chart_type" : chart_type}
        if(chart_duration ==="thisweek"){ 
            chart_duration = "this_week";
        }
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
        

        var userObj = {"user_id": user_id, "product_name" : product_name,"report_type" : report_type, "chart_type" :chart_type, "statistics_type": statisticsType,  "favorite" : 1, "role" : "user", "api": $rootScope.url}
        //$scope.userLogged = localStorageService.get("user");

        console.log("user obj", userObj);
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
        var  user_id = localStorageService.get("user")[0].id;
        //var userObj = {"user_id": user_id,"role" : "user"};
        var userObj = {"user_id": user_id,"role" : "user"};
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
        var userObj = {"user_id": user_id,"role" : "user"}
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
        var userLogged = localStorageService.get("user")[0].name;
        var userObj = {"username": userLogged,"product_name" : product_name}
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
        var userLogged = localStorageService.get("user")[0].name;
        var userObj = {"username": userLogged,"product_name" : product_name};
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
       this.getSaturationReportUrl = function(product_name) {
        var userLogged = localStorageService.get("user")[0].name;
        var userObj = {"username": "training","product_name" : product_name};
        var deferred = $q.defer();
        $http({
                    method : 'POST',
                    url : appConstants.serviceAddress+'/user/saturation',
                    data : userObj
                }).then(function(response) {
                    deferred.resolve(response);
                }, function(error) {
                    deferred.reject(error);
                });
                return deferred.promise;
           
        
        
       };
       this.getLiveChartUrl = function() {
        var userLogged = localStorageService.get("user")[0].name;
        //debugger;
        var userObj = {"username": "training"}
        var deferred = $q.defer();
        $http({
                    method : 'POST',
                    url : appConstants.serviceAddress+'/user/live_chart',
                    data : userObj
                }).then(function(response) {
                    deferred.resolve(response);
                }, function(error) {
                    deferred.reject(error);
                });
                return deferred.promise;
           
        
        
       };
       this.getLiveChartByProductUrl = function(item) {
        var userLogged = localStorageService.get("user")[0].name;
        //debugger;
        var userObj = {"username": userLogged, "product_name" : item}
        var deferred = $q.defer();
        $http({
                    method : 'POST',
                    url : appConstants.serviceAddress+'/user/product_click',
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