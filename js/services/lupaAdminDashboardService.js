var lupaAdminDashboardService = angular.module('lupaAdminDashboardProvider', ['lupaSharedProvider']);
lupaAdminDashboardService.service('lupaAdminDashboardService', ['$http', '$q','$filter','localStorageService','appConstants','userData', '$rootScope',
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
        var userObj = {"username": userLogged, "product_name" : current_prod, "type": statistics_type, "chart_type" : chart_type}
        if(chart_duration ==="thisweek"){
            chart_duration = "this_week";
        }
        var deferred = $q.defer();
        $rootScope.url= appConstants.serviceAddress+'/admin/'+chart_duration+'_licenses_used';
        
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
        $rootScope.url= appConstants.serviceAddress+'/admin/'+chart_duration+'_licenses_used_shifts';
        
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
        //var product_name = product_name;

        var userObj = {"user_id": user_id, "product_name" : product_name,"report_type" : report_type, "chart_type" :chart_type, "statistics_type": statisticsType,  "favorite" : 1, "role" : "admin", "api": $rootScope.url}
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
        var  user_id = localStorageService.get("user")[0].id;
        //var userObj = {"user_id": user_id,"role" : "admin"};
        var userObj = {"user_id": user_id,"role" : "admin"};
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
        var userObj = {"user_id": user_id,"role" : "admin"}
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
                    url : appConstants.serviceAddress+'/admin/last_five_minutes',
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
        var userObj = {"username": userLogged,"product_name" : product_name}
        var deferred = $q.defer();
        $http({
                    method : 'POST',
                    url : appConstants.serviceAddress+'/admin/todays_data',
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
        var userObj = {"username": userLogged}
        var deferred = $q.defer();
        $http({
                    method : 'POST',
                    url : appConstants.serviceAddress+'/admin/live_chart',
                    data : userObj
                }).then(function(response) {
                    deferred.resolve(response);
                }, function(error) {
                    deferred.reject(error);
                });
                return deferred.promise;
           
        
        
       };

       this.getAdminReportYearListUrl = function(username, product_name) {
        
        //$scope.userLogged = localStorageService.get("user");
        var userObj = {"username": username, "product_name" : product_name}
        var deferred = $q.defer();
        $rootScope.url= appConstants.serviceAddress+'/admin/years_filter_list';
        
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
       this.getAdminYearlyReportDepartmentFilterUrl = function(username, product_name, type, chart_type, userFilterType, filter_year,report_type) {
        //debugger;
        //$scope.userLogged = localStorageService.get("user");
        if(report_type == "thisweek"){
            report_type = "this_week";
        }
        
        var deferred = $q.defer();
        if(report_type == 'yearly') {
            var year = "_year";
            var userObj = {"username": username, "product_name" : product_name, "type": type, "chart_type": chart_type, "filter_year": filter_year}
        }
        
        else {
            var year = "";
            if(userFilterType == 'dept') {
                 var userObj = {"username": username, "product_name" : product_name, "type": type, "chart_type": chart_type, "filter_department": filter_year}
            }
            else {
                 var userObj = {"username": username, "product_name" : product_name, "type": type, "chart_type": chart_type, "filter_user": filter_year}
            }
           

        }
        $rootScope.url= appConstants.serviceAddress+'/admin/' +report_type+ '_licenses_used'+year+'_'+userFilterType+'_filter';
        
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

       this.getAdminReportUserListUrl = function() {
            var deferred = $q.defer();
            $http({
                method : 'GET',
                url : appConstants.serviceAddress+'/admin/filter_users_list'
            }).then(function(response) {
                deferred.resolve(response);
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };
        this.getAdminReportDeptListUrl = function() {
            var deferred = $q.defer();
            $http({
                method : 'GET',
                url : appConstants.serviceAddress+'/admin/filter_dept_list'
            }).then(function(response) {
                deferred.resolve(response);
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };
        this.getSaturationReportUrl = function(product_name) {
        var userLogged = localStorageService.get("user")[0].name;
        var userObj = {"product_name" : product_name};
        var deferred = $q.defer();
        $http({
                    method : 'POST',
                    url : appConstants.serviceAddress+'/admin/saturation',
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
        var userObj = {"username": userLogged}
        var deferred = $q.defer();
        $http({
                    method : 'GET',
                    url : appConstants.serviceAddress+'/admin/live_chart',
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
                    url : appConstants.serviceAddress+'/admin/product_click',
                    data : userObj
                }).then(function(response) {
                    deferred.resolve(response);
                }, function(error) {
                    deferred.reject(error);
                });
                return deferred.promise;
           
        
        
       };
       
       this.getfetchShiftListUrl = function() {
            var deferred = $q.defer();
            $http({
                method : 'GET',
                url : appConstants.serviceAddress+'/admin/get_shifts'
            }).then(function(response) {
                deferred.resolve(response);
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };
        this.addShiftTimeUrl = function(shift_name, start_time, end_time) {
            var userObj = {"shift_name": shift_name, "start_time" : start_time, "end_time": end_time};
            var deferred = $q.defer();
            $http({
                method : 'POST',
                url : appConstants.serviceAddress+'/admin/add_shift',
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
        this.getThisWeekShiftsUrl = function () {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: appConstants.serviceAddress + '/admin/get_shifts'
                }).then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;

        };


      
}]);