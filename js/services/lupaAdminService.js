var lupaAdminService = angular.module('lupaAdminProvider', ['lupaSharedProvider']);
lupaAdminService.service('lupaAdminService', ['$http', '$q', '$filter', 'localStorageService', 'appConstants', 'userData', 'userRegData', 'userRegOtpVal', 'userEmailData', 'userResetData', 'adminProfileSettingData', 'addDepartmentData', 'transferUserData', 'smtpData', 'smtpTestData', 'purchaseData', 'notificationId',
    function ($http, $q, $filter, localStorageService, appConstants, userData, userRegData, userRegOtpVal, userEmailData, userResetData, adminProfileSettingData, addDepartmentData, transferUserData, smtpData, smtpTestData, purchaseData, notificationId) {

        var product_name = localStorageService.get("product_name");
        if(product_name == "" || product_name == "undefined" || product_name == null) {
            product_name = "LSTC"
        }
        /*
          * fetch the user department list
          */
        this.fetchUserDeptList = function () {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: appConstants.serviceAddress + '/user/registration_page_data'
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        /*
          * fetch the elastic URL
          */
        this.fetchDeptList = function () {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: appConstants.serviceAddress + '/departmentmanager/department_types'
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };
        /*
        * user login detail
        */

        this.loginUser = function () {
            var userObj = userData.get();
            var deferred = $q.defer();
            if (typeof userObj !== "undefined") {
                $http({
                    method: 'POST',
                    url: appConstants.serviceAddress + '/admin/login',
                    data: userObj
                }).then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            }
        };

        /*
         * user forgor password detail
         */

        this.getUserForgotPasswordOtp = function () {
            var userObj = userEmailData.get();
            var deferred = $q.defer();
            if (typeof userObj !== "undefined") {
                $http({
                    method: 'POST',
                    url: appConstants.serviceAddress + '/admin/password/email',
                    data: userObj
                }).then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            }
        };

        /*
        * password otp detail
        */

        this.validateUserForgotPasswordOtp = function () {
            var userObj = userRegOtpVal.get();
            var deferred = $q.defer();
            if (typeof userObj !== "undefined") {
                $http({
                    method: 'POST',
                    url: appConstants.serviceAddress + '/admin/password/forgotpassword/otp',
                    data: userObj
                }).then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            }
        };

        /*
         * reset password detail
         */

        this.resetUserPassword = function () {
            var userObj = userResetData.get();
            var deferred = $q.defer();
            if (typeof userObj !== "undefined") {
                $http({
                    method: 'POST',
                    url: appConstants.serviceAddress + '/admin/password/reset',
                    data: userObj,
                }).then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            }
        };

        /*
          * fetch the user profile details
          */

        this.fetchUserProfileSettings = function () {
            var userLogged = null;
            if (localStorageService.get("user") !== null) {
                userLogged = localStorageService.get("user")[0];
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: appConstants.serviceAddress + '/admin/profile_existing_data?id=' + userLogged.id
                }).then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            }
        };

        /*
         * user update profile setting
         */

        this.updateProfileSettings = function () {
            var userObj = adminProfileSettingData.get();
            var deferred = $q.defer();
            if (typeof userObj !== "undefined") {
                $http({
                    method: 'POST',
                    url: appConstants.serviceAddress + '/admin/profileupdate',
                    data: userObj
                }).then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            }
        };

        /*
          * fetch department lists
          */

        this.fetchDepartmentList = function () {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: appConstants.serviceAddress + '/admin/totaldepartments_list'
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        /*
        * add department 
        */

        this.addDepartment = function () {
            var userObj = addDepartmentData.get();
            var deferred = $q.defer();
            if (typeof userObj !== "undefined") {
                $http({
                    method: 'POST',
                    url: appConstants.serviceAddress + '/admin/deptAdd',
                    data: userObj
                }).then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            }
        };

        /*
          * Delete department from lists
          */

        this.delteDepartment = function (id) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: appConstants.serviceAddress + '/admin/deptDestroy?id=' + id
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        /*
		 * fetch licenses lists
		 */

        this.fetchLicenseList = function () {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: appConstants.serviceAddress + '/admin/total_license'
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        /*
		 * fetch department managers lists
		 */

        this.fetchDeptManagersList = function () {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: appConstants.serviceAddress + '/admin/departmentmangers_list'
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        /*
		 * approve department manager
		 */

        this.approveDeptManager = function (id) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: appConstants.serviceAddress + '/admin/deptmanagerctivate?id=' + id
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        /*
		 * Block department manager
		 */

        this.blockDeptManager = function (id) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: appConstants.serviceAddress + '/admin/deptmanagerdeactivate?id=' + id
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        /*
		 * Delete department manager
		 */

        this.deleteDeptManager = function (id) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: appConstants.serviceAddress + '/admin/deptmanagerdelete?id=' + id
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        /*
		 * Fetch User List
		 */

        this.fetchUsersList = function () {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: appConstants.serviceAddress + '/admin/users_list'
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        /*
		 * Block User
		 */

        this.blockUser = function (id) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: appConstants.serviceAddress + '/admin/userblock?id=' + id
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        /*
		 * Unblock User
		 */

        this.unBlockUser = function (id) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: appConstants.serviceAddress + '/admin/userunblock?id=' + id
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };


        /*
		 * Delete User
		 */

        this.deleteUser = function (id) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: appConstants.serviceAddress + '/admin/userdelete?id=' + id
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        /*
        * Fetch Department list to transfer user
        */

        this.getTransDepartmentList = function () {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: appConstants.serviceAddress + '/admin/departments_list'
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        /**
         * Transfer User from department to to department
         */

        this.transferUser = function () {
            var userObj = transferUserData.get();
            var deferred = $q.defer();
            if (typeof userObj !== "undefined") {
                $http({
                    method: 'POST',
                    url: appConstants.serviceAddress + '/admin/usertransfer',
                    data: userObj
                }).then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            }
        };

        /*
		 * Fetch existing smtp details
		 */

        this.getSmtpExistingDetails = function () {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: appConstants.serviceAddress + '/admin/smtp_existing_details'
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        /*
        * Update smtp details
        */

        this.updateSmtpDetails = function () {
            var userObj = smtpData.get();
            var deferred = $q.defer();
            if (typeof userObj !== "undefined") {
                $http({
                    method: 'POST',
                    url: appConstants.serviceAddress + '/admin/smtp_update',
                    data: userObj
                }).then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            }
        };

        /*
          * Test smtp mail
          */

        this.testSmtpMail = function () {
            var userObj = smtpTestData.get();
            var deferred = $q.defer();
            if (typeof userObj !== "undefined") {
                $http({
                    method: 'POST',
                    url: appConstants.serviceAddress + '/admin/test_mail',
                    data: userObj
                }).then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            }
        };

        /*
           * Fetch purchase list
           */

        this.getPurchaseList = function () {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: appConstants.serviceAddress + '/admin/purchase_list'
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        /*
        * Update purchase details
        */

        this.updatePurchaseDetails = function () {
            var userObj = purchaseData.get();
            var deferred = $q.defer();
            if (typeof userObj !== "undefined") {
                $http({
                    method: 'POST',
                    url: appConstants.serviceAddress + '/admin/cost_calculation',
                    data: userObj
                }).then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            }
        };

        /*
           * Delete purchase from lists
           */

        this.deletePurchase = function (id) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: appConstants.serviceAddress + '/admin/delete_purchase?id=' + id
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        /*
		 * Fetch product list
		 */

        this.getProductList = function () {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: appConstants.serviceAddress + '/products'
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };


        /*
        * Get Notification
        */

        this.getNotifications = function (id) {
            var userObj = {
                id : id
            };
            var deferred = $q.defer();
            if (id !== "undefined") {
                $http({
                    method: 'POST',
                    url: appConstants.serviceAddress + '/admin/notifications',
                    data: userObj
                }).then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            }
        };

        /**
        * Ack the request
        */

        this.ackRequest = function (id) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: appConstants.serviceAddress + '/admin/notification_ok?notificationid=' + id
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };
        this.getOverallCostAnalyticsUrl = function () {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: appConstants.serviceAddress + '/admin/overall_cost_anlytics'
                }).then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;

        };
        this.overallCostAnalyticsUrl = function(product_name, year, month) {
        if(year == 'overall' || year == 'Overall') {
            year = '';
        }
        if(month == 'overall' || month == 'Overall') {
            month = '';
        }
        if(year == '' && month != '' ) {
            year = '2018'
        }
        var userObj = {"year": year,"month" : month};
        var deferred = $q.defer();
        $http({
                    method : 'POST',
                    url : appConstants.serviceAddress+'/admin/overall_cost_anlytics_filter',
                    data : userObj
                }).then(function(response) {
                    deferred.resolve(response);
                }, function(error) {
                    deferred.reject(error);
                });
                return deferred.promise;
           
        
        
       };
        this.getAllFeatureListUrl = function () {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: appConstants.serviceAddress + '/admin/all_features_list'
                }).then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;

        };
        this.getYearlyExpenditureUrl = function(year, month, type_of_license) {
        if(year == 'overall' || year == 'Overall') {
            year = '';
        }
        if(month == 'overall' || month == 'Overall') {
            month = '';
        }
        if(type_of_license == 'overall' || type_of_license == 'Overall') {
            type_of_license = '';
        }
        if(year == '' && month != '' ) {
            year = '2018'
        }
        
        var userObj = {"year": year,"month" : month, "type_of_license": type_of_license};
        var deferred = $q.defer();
        $http({
                    method : 'POST',
                    url : appConstants.serviceAddress+'/admin/yearly_expenditure',
                    data : userObj
                }).then(function(response) {
                    deferred.resolve(response);
                }, function(error) {
                    deferred.reject(error);
                });
                return deferred.promise;
           
        
        
       };
       this.getFeaturePercentageUrl = function(year,month,product_name) {
        if(year == 'overall' || year == 'Overall') {
            year = '';
        }
        if(month == 'overall' || month == 'Overall') {
            month = '';
        }
        if(year == '' && month != '' ) {
            year = '2018'
        }
        var userObj = {"year": year,"month" : month, "product_name": product_name};
        var deferred = $q.defer();
        $http({
                    method : 'POST',
                    url : appConstants.serviceAddress+'/admin/feature_percentages',
                    data : userObj
                }).then(function(response) {
                    deferred.resolve(response);
                }, function(error) {
                    deferred.reject(error);
                });
                return deferred.promise;
           
        
        
       };
       this.addThisWeekShiftUrl  = function(shift_name, start_time, end_time) {
        var userObj = {"shift_name": shift_name,"start_time" : start_time, "end_time": end_time};
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
       this.deleteThisWeekShiftUrl  = function(id) {
        var userObj = {"id": id};
        var deferred = $q.defer();
        $http({
                    method : 'POST',
                    url : appConstants.serviceAddress+'/admin/delete_shifts',
                    data : userObj
                }).then(function(response) {
                    deferred.resolve(response);
                }, function(error) {
                    deferred.reject(error);
                });
                return deferred.promise;
           
        
        
       };
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
