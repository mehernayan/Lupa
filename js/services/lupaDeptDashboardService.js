var lupaDeptDashboardService = angular.module('lupaDeptDashboardProvider', ['lupaSharedProvider']);
lupaDeptDashboardService.service('lupaDeptDashboardService', ['$http', '$q','$filter','localStorageService','appConstants','userData', '$rootScope',
    function ($http, $q, $filter, localStorageService,appConstants,userData, $rootScope) {
        //console.log(userData);
        //console.log(localStorageService.get("user")[0].id);
        //debugger;

        var product_name = localStorageService.get("product_name");
        if(product_name == "" || product_name == "undefined" || product_name == null) {
            product_name = "LSDYNA"
        }

        this.changeGraphUrl = function(chart_duration, chart_type, statistics_type,current_prod) {
        product_name = localStorageService.get("product_name");
        var userLogged = localStorageService.get("user")[0].name;
        if(chart_duration ==="thisweek"){
            chart_duration = "this_week";
        }
        var userObj = {"username": userLogged, "product_name" : current_prod, "type": statistics_type, "chart_type" : chart_type}
        //var userObj = {"username": "Harish", "product_name" : product_name, "type": statistics_type, "chart_type" : chart_type}
        var deferred = $q.defer();
        $rootScope.url= appConstants.serviceAddress+'/departmentmanager/'+chart_duration+'_licenses_used';
        
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
       this.loadThisWeekShiftGraphUrl = function(chart_duration, chart_type, statistics_type) {
        
        var userLogged = localStorageService.get("user")[0].name;
        var userObj = {"username": userLogged, "product_name" : product_name, "type": statistics_type, "chart_type" : chart_type}
        if(chart_duration ==="thisweek"){
            chart_duration = "this_week";
        }
        var deferred = $q.defer();
        $rootScope.url= appConstants.serviceAddress+'/departmentmanager/'+chart_duration+'_licenses_used_shifts';
        
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
       this.addFavouriteUrl = function(report_type, chart_type, statisticsType, product_name) {
        if(chart_type == undefined) {
            chart_type = 'vertical_bar_chart';
        }
        var  user_id = localStorageService.get("user")[0].id;
        var weeklyReportYearOverallSel = localStorageService.get("weeklyReportYearOverall");
        var weeklyReportIndividualFilter = localStorageService.get("weeklyReportIndividualFilter");

        var yearlyReportIndividual = localStorageService.get("yearlyReportIndividual");
        var monthlyReportIndividual = localStorageService.get("monthlyReportIndividual");
        var thisWeekReportIndividualFilter = localStorageService.get("thisWeekReportIndividualFilter");
        

        var userObj = {"user_id": user_id, "product_name" : product_name,"report_type" : report_type, "chart_type" :chart_type, "statistics_type": statisticsType,  "favorite" : 1, "role" : "dept", "api": $rootScope.url};
        if(report_type == "yearly") {
          var userObj = {"user_id": user_id, "product_name" : product_name,"report_type" : report_type, "chart_type" :chart_type, "statistics_type": statisticsType,  "favorite" : 1, "role" : "dept", "api": $rootScope.url, "filter_year": yearlyReportIndividual}; 
        }
        if(report_type == "monthly") {
          var userObj = {"user_id": user_id, "product_name" : product_name,"report_type" : report_type, "chart_type" :chart_type, "statistics_type": statisticsType,  "favorite" : 1, "role" : "dept", "api": $rootScope.url, "filter_year": monthlyReportIndividual}; 
        }
        if(report_type == "weekly") {
         
          var userObj = {"user_id": user_id, "product_name" : product_name,"report_type" : report_type, "chart_type" :chart_type, "statistics_type": statisticsType,  "favorite" : 1, "role" : "dept", "api": $rootScope.url, "filter_year": weeklyReportYearOverallSel};
          
          if(weeklyReportIndividualFilter != "") {
              if(userFilterType == "user") {
                  var userObj = {"user_id": user_id, "product_name" : product_name,"report_type" : report_type, "chart_type" :chart_type, "statistics_type": statisticsType,  "favorite" : 1, "role" : "dept", "api": $rootScope.url, "filter_year": weeklyReportYearOverallSel, "filter_user": weeklyReportIndividualFilter};
              }
              else {
                  var userObj = {"user_id": user_id, "product_name" : product_name,"report_type" : report_type, "chart_type" :chart_type, "statistics_type": statisticsType,  "favorite" : 1, "role" : "dept", "api": $rootScope.url, "filter_year": weeklyReportYearOverallSel, "filter_department": weeklyReportIndividualFilter};
              }
              
              
          }
           
        }
        if(report_type == "thisweek" || report_type == "this_week") {
         
          var userObj = {"user_id": user_id, "product_name" : product_name,"report_type" : report_type, "chart_type" :chart_type, "statistics_type": statisticsType,  "favorite" : 1, "role" : "dept", "api": $rootScope.url};
          
          if(thisWeekReportIndividualFilter != "") {
              if(userFilterType == "user") {
                  var userObj = {"user_id": user_id, "product_name" : product_name,"report_type" : report_type, "chart_type" :chart_type, "statistics_type": statisticsType,  "favorite" : 1, "role" : "dept", "api": $rootScope.url, "filter_user": thisWeekReportIndividualFilter};
              }
              else if(userFilterType == "dept"){
                  var userObj = {"user_id": user_id, "product_name" : product_name,"report_type" : report_type, "chart_type" :chart_type, "statistics_type": statisticsType,  "favorite" : 1, "role" : "dept", "api": $rootScope.url, "filter_department": thisWeekReportIndividualFilter};
              }
              
              
          }
           
        }
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
        var userObj = {"user_id": user_id,"role" : "dept"};
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
        var userrole = localStorageService.get("user")[0].userType;

        var userObj = {"user_id": user_id,"role" : userrole}
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
        var user_id = localStorageService.get("user")[0].id;
        var userObj = {"id": user_id, "product_name" : product_name}
        var deferred = $q.defer();
        $http({
                    method : 'POST',
                    url : appConstants.serviceAddress+'/departmentmanager/last_five_minutes',
                    data : userObj
                }).then(function(response) {
                    deferred.resolve(response);
                }, function(error) {
                    deferred.reject(error);
                });
                return deferred.promise;
           
        
        
       };
        this.getTodayReportUrl = function(product_name) {
        var user_id = localStorageService.get("user")[0].id;
        var userObj = {"id": user_id, "product_name" : product_name};
        var deferred = $q.defer();
        $http({
                    method : 'POST',
                    url : appConstants.serviceAddress+'/departmentmanager/todays_data',
                    data : userObj
                }).then(function(response) {
                    deferred.resolve(response);
                }, function(error) {
                    deferred.reject(error);
                });
                return deferred.promise;
           
        
        
       };
       this.getLiveChartUrl = function() {
        var userid = localStorageService.get("user")[0].id;
        var userObj = {"id": userid}
        var deferred = $q.defer();
        $http({
                    method : 'POST',
                    url : appConstants.serviceAddress+'/departmentmanager/live_chart',
                    data : userObj
                }).then(function(response) {
                    deferred.resolve(response);
                }, function(error) {
                    deferred.reject(error);
                });
                return deferred.promise;
           
        
        
       };
       this.getDepartmentManagerReportFilterUrl = function(username, product_name, type, chart_type, userFilterType, filter_year, report_type) {
        //$scope.userLogged = localStorageService.get("user");
        if(report_type ==="thisweek"){
            report_type = "this_week";
        }
        
        var deferred = $q.defer();
        if(report_type == 'yearly') {
            
            var year = "year";
            var userObj = {"username": username, "product_name" : product_name, "type": type, "chart_type": chart_type, "filter_year": filter_year}
            $rootScope.url= appConstants.serviceAddress+'/departmentmanager/' +report_type+ '_licenses_used_'+year+'_filter';
            
         }
        
        else if(report_type == 'monthly'){
            var year = "";
            //var userObj = {"username": "Harish", "product_name" : product_name, "type": type, "chart_type": chart_type};
            var userObj = {"username": username, "product_name" : product_name, "type": type, "chart_type": chart_type}
            $rootScope.url= appConstants.serviceAddress+'/departmentmanager/' +report_type+ '_licenses_used_'+userFilterType+'_filter';
            //var userObj = {"username": username, "product_name" : product_name, "type": type, "chart_type": chart_type}
            /*if(userFilterType == 'dept') {
                 var userObj = {"username": username, "product_name" : product_name, "type": type, "chart_type": chart_type, "filter_department": filter_year}
            }
            else {
                 var userObj = {"username": username, "product_name" : product_name, "type": type, "chart_type": chart_type, "filter_user": filter_year}
            }*/
           

        }
        else if(report_type == 'weekly' || report_type == 'this_week') {
            var year = "";
            var userObj = {"username": username, "product_name" : product_name, "type": type, "chart_type": chart_type, "filter_user": filter_year}
            $rootScope.url= appConstants.serviceAddress+'/departmentmanager/' +report_type+ '_licenses_used_'+userFilterType+'_filter';
            
        }
        else {
             $rootScope.url= appConstants.serviceAddress+'/departmentmanager/' +report_type+ '_licenses_used'+year+'_filter';
        }
       
        //debugger;
        
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
           
        
        
       }
       this.getSaturationReportUrl = function(product_name) {
        var  user_id = localStorageService.get("user")[0].id;
        var userObj = {"id": user_id,"product_name" : product_name};
        var deferred = $q.defer();
        $http({
                    method : 'POST',
                    url : appConstants.serviceAddress+'/departmentmanager/saturation',
                    data : userObj
                }).then(function(response) {
                    deferred.resolve(response);
                }, function(error) {
                    deferred.reject(error);
                });
                return deferred.promise;
           
        
        
       };
       this.getDeptReportYearListUrl = function(username, current_prod, statisticsIndType) {
        //$scope.userLogged = localStorageService.get("user");
        var userObj = {"username": username, "product_name" : current_prod};
        //var userObj = {"username": "Harish", "product_name" : product_name}
        var deferred = $q.defer();
        $rootScope.url= appConstants.serviceAddress+'/departmentmanager/years_filter_list';
        
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
       this.getDeptReportFilterUserListUrl = function(id) {
        
        //$scope.userLogged = localStorageService.get("user");
        //var userObj = {"username": username, "product_name" : product_name}
        var userid = localStorageService.get("user")[0].id;
        var userObj = {"id": userid}
        
        var deferred = $q.defer();
        $rootScope.url= appConstants.serviceAddress+'/departmentmanager/filter_users_list';
        
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
       this.getLiveChartByProductUrl = function(item) {
        var userLogged = localStorageService.get("user")[0].name;
        //debugger;
        var userObj = {"username": userLogged, "product_name" : item}
        //var userObj = {"username": "Harish", "product_name" : item}
        var deferred = $q.defer();
        $http({
                    method : 'POST',
                    url : appConstants.serviceAddress+'/departmentmanager/product_click',
                    data : userObj
                }).then(function(response) {
                    deferred.resolve(response);
                }, function(error) {
                    deferred.reject(error);
                });
                return deferred.promise;
           
        
        
       };


      
}]);