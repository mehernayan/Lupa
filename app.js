// create the module and name it lupaApp
var lupaApp = angular.module('lupaApp', ['ngRoute', 'lupaUserProvider', 'lupaAdminProvider', 'lupaManagerProvider', 'lupaSharedProvider', 'lupaUserDashboardProvider', 'lupaDeptDashboardProvider', 'lupaAdminDashboardProvider', 'lupaLicenceProvider','LocalStorageModule', 'FBAngular', 'ps.inputTime']);

// configure our routes
lupaApp.config(function ($routeProvider, $httpProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/uservalidate.html',
			controller: 'userValidateController'
		})
		.when('/user', {
			templateUrl: 'views/userlogin.html',
			controller: 'userLoginController'
		})

		.when('/admin', {
			templateUrl: 'views/adminlogin.html',
			controller: 'adminLoginController'
		})

		.when('/manager', {
			templateUrl: 'views/managerlogin.html',
			controller: 'managerLoginController'
		})


		.when('/userprofilesetting', {
			templateUrl: 'views/userprofilesetting.html',
			controller: 'userPSettingController'
		})
		.when('/adminprofilesetting', {
			templateUrl: 'views/adminprofilesetting.html',
			controller: 'adminPSettingController'
		})
		.when('/deptprofilesetting', {
			templateUrl: 'views/deptprofilesetting.html',
			controller: 'deptPSettingController'
		})
		.when('/adminsetting', {
			templateUrl: 'views/adminsetting.html',
			controller: 'adminSettingController'
		})
		.when('/deptsetting', {
			templateUrl: 'views/deptsetting.html',
			controller: 'deptSettingController'
		})

		.when('/dynacompares', {
			templateUrl: 'views/dynacompares.html',
			controller: 'dynaComparesController'
		})

		.when('/smtp', {
			templateUrl: 'views/smtp.html',
			controller: 'smtpController'
		})
		.when('/costcalculator', {
			templateUrl: 'views/costcalculator.html',
			controller: 'costCalculatorController'
		})
		.when('/userdashboard', {
			templateUrl: 'views/userdashboard.html',
			controller: 'userDashboardController'
		})
		.when('/userreport', {
			templateUrl: 'views/userreport.html',
			controller: 'userReportController'
		})
		.when('/userfavourite', {
			templateUrl: 'views/userfavourite.html',
			controller: 'userFavouriteController'
		})
		.when('/deptdashboard', {
			templateUrl: 'views/deptdashboard.html',
			controller: 'deptDashboardController'
		})
		.when('/deptreport', {
			templateUrl: 'views/deptreport.html',
			controller: 'deptReportController'
		})
		.when('/deptfavourite', {
			templateUrl: 'views/deptfavourite.html',
			controller: 'deptFavouriteController'
		})
		.when('/admindashboard', {
			templateUrl: 'views/admindashboard.html',
			controller: 'adminDashboardController'
		})
		.when('/adminreport', {
			templateUrl: 'views/adminreport.html',
			controller: 'adminReportController'
		})
		.when('/adminfavourite', {
			templateUrl: 'views/adminfavourite.html',
			controller: 'adminFavouriteController'
		})
		.when('/admincostanalytics', {
			templateUrl: 'views/admincostanalytics.html',
			controller: 'adminCostAnalyticsController'
		}).otherwise('/', {
			templateUrl: 'views/uservalidate.html',
			controller: 'userValidateController'
		})

	$httpProvider.defaults.useXDomain = true;
	$httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
	$httpProvider.interceptors.push('noCacheInterceptor');
	//$httpProvider.interceptors.push('httpInterceptor');
}).factory('noCacheInterceptor', function () {
	return {
		request: function (config) {
			//console.log(config);
			if (config.method.toUpperCase() === "GET") {
				if (config.url.indexOf('.html') === -1) {
					var seperator = config.url.indexOf('?') === -1 ? '?' : '&';
					config.url = config.url + seperator + 'ts=' + new Date().getTime();
				}
			}
			return config;
		}
	};

});
lupaApp.controller('mainController', ['$scope', '$timeout', '$window', 'localStorageService', '$location', 'Fullscreen', 'lupaManagerService', 'lupaAdminService', 'notificationId',
	function ($scope, $timeout, $window, localStorageService, $location, Fullscreen, lupaManagerService, lupaAdminService, notificationId) {
		// create a message to display in our view
		$scope.message = 'Everyone come and see how good I look!';
		$scope.username = "";
		$scope.userType = "";
		$scope.headInit = function () {
			$scope.user = localStorageService.get('user');
			if (typeof $scope.user !== "undefined" && $scope.user !== [] && $scope.user !== null) {
				$scope.username = $scope.user[0].name;
				$scope.userType = $scope.user[0].userType;

				if ($scope.userType === "dept") {
					$scope.getDeptNotifications();
				} else if ($scope.userType === "admin") {
					$scope.getAdminNotifications();
				}
			}
		};
		$scope.resizeMouseOver = function(event) {
			var id = $(event.target).closest(".chart-render").attr("id");
			//$("#"+id).draggable({ containment: "parent", cursor: "move", cursorAt: { top: -5, left: -5 } , zIndex : 1000 });
			$("#"+id).resizable({
				minWidth: 500,
				minHeight: 532
			}).on('resize', function (e) {
				var resizeGraph = $(e.target).find('.js-plotly-plot').attr('id');
				var gd1 = document.getElementById(resizeGraph);
				Plotly.Plots.resize(gd1);
			});
			$("#sortable").sortable();
			$( "#sortable" ).disableSelection();
		}
		/*setTimeout(function () {
			$(".resize-move").mouseover(function() {
			var id = $(this).closest(".chart-render").attr("id");
			$("#"+id).draggable({ containment: "parent", cursor: "move", cursorAt: { top: -5, left: -5 } , zIndex : 1000 });
			$("#"+id).resizable({
				minWidth: 500,
				minHeight: 532
			}).on('resize', function (e) {
				var resizeGraph = $(e.target).find('.js-plotly-plot').attr('id');
				var gd1 = document.getElementById(resizeGraph);
				Plotly.Plots.resize(gd1);
			});
			
			});
			
			

		}, 10000);*/





		$scope.expandNav = true;
		$scope.collapseNav = false;
		$scope.navToggle = function () {
			if ($scope.expandNav) {
				$scope.expandNav = false;
				$scope.collapseNav = true;
			}
			else {
				$scope.expandNav = true;
				$scope.collapseNav = false;
			}
		};
		$scope.zoomOut = function ($event) {
			$($event.target.closest('.chart-container')).find('a[data-title*="Zoom out"]')[0].click();
		}
		$scope.reportToggleFlag = false;
		$scope.reportToggle = function(e) {
			$(e.target).closest(".navigation-links").find("#reports").slideToggle();
			$(e.target).closest(".navigation-links").find("#duration").slideToggle();
			if(!$scope.reportToggleFlag) {
				$scope.reportToggleFlag = true;

			}
			else {
				$scope.reportToggleFlag = false;
			}
			
			
		}
		$scope.slideInnerNav = function(e) {
			$(e.target).closest("li").next("ul").slideToggle();
		} 
		$scope.downloadChart = function ($event) {
			$($event.target.closest('.chart-container')).find('a[data-title*="Download plot as a png"]')[0].click();
		}
		$scope.goFullscreen = function (e) {
			
			if (Fullscreen.isEnabled()) {
				Fullscreen.cancel();
			}
			else {
				//Fullscreen.all();
				Fullscreen.enable($(e.target).closest('.chart-render')[0]);
				//Fullscreen.enable(document.getElementById('full-screen-view'));
			}
				

		}
		$scope.goFullscreenOther = function (e) {
			
			if (Fullscreen.isEnabled()) {
				Fullscreen.cancel();
			}
			else {
				//Fullscreen.all();
				Fullscreen.enable($(e.target).closest('.full-screen-view')[0]);
				//Fullscreen.enable(document.getElementById('full-screen-view'));
			}
				

		}
		$scope.removeReport = function(event) {
			$(event.target).closest(".full-screen-view").hide();
		}

		$timeout(function () {
			$("#product li").on("click", function (event) {
				event.stopPropagation();
			})
		}, 2000);

		$scope.userLoggedId = {
			id: ''
		};
		$scope.$watch('userLoggedId', function (n, o) {
			if (n !== o) {
				notificationId.set(n.id);
			};
		}, true);

		$scope.getDeptNotifications = function () {
			$scope.user = localStorageService.get('user');
			if (typeof $scope.user !== "undefined" && $scope.user !== [] && $scope.user !== null) {
				var notificationId = $scope.user[0].id;
				$scope.errorNot = "";
				$('#loadergif').show();
				lupaManagerService.getNotifications(notificationId).then(function (response) {
					$('#loadergif').hide();
					//console.log(response.data,"register user");
					$scope.response = JSON.parse(response.data.status_response);
					//console.log($scope.response,"is success");
					if (typeof $scope.response !== "undefined") {
						if ($scope.response.success) {
							$scope.errorNot = "";
							$scope.deptnotifications = $scope.response.data;
						} else {
							$scope.errorNot = $scope.response.message;
						}
					}
				});
			}else{
				$scope.errorNot = "There is an error fetching notification.";
			}
		};

		$scope.getAdminNotifications = function () {
			$scope.errorNot = "";
			$('#loadergif').show();
			lupaAdminService.getNotifications().then(function (response) {
				$('#loadergif').hide();
				//console.log(response.data,"register user");
				$scope.response = JSON.parse(response.data.status_response);
				//console.log($scope.response,"is success");
				if (typeof $scope.response !== "undefined") {
					if ($scope.response.success) {
						$scope.errorNot = "";
						$scope.adminnotifications = $scope.response.data;
					} else {
						$scope.errorNot = $scope.response.message;
					}
				}
			});
		};

		/**
		 * Accept Request
		 */

		$scope.acceptDeptRequest = function (id) {
			$scope.errorAccMsg = "";
			$('#loaderNotification').show();
			lupaManagerService.acceptRequest(id).then(function (response) {
				$('#loaderNotification').hide();
				$scope.response = JSON.parse(response.data.status_response);
				if (typeof $scope.response !== "undefined") {
					if ($scope.response.success) {
						$scope.errorAccMsg = "";
						$scope.curId = id;
						$scope.acceptMsg = $scope.response.message;
					} else {
						$scope.curId = id;
						$scope.acceptMsg = "";
						$scope.errorAccMsg = $scope.response.message;
					}
				}
			});
		};

		/**
		 * Reject Request
		 */

		$scope.rejectDeptRequest = function (id) {
			$scope.errorAccMsg = "";
			$('#loaderNotification').show();
			lupaManagerService.rejectRequest(id).then(function (response) {
				$('#loaderNotification').hide();
				$scope.response = JSON.parse(response.data.status_response);
				if (typeof $scope.response !== "undefined") {
					if ($scope.response.success) {
						$scope.errorAccMsg = "";
						$scope.curId = id;
						$scope.acceptMsg = $scope.response.message;
					} else {
						$scope.curId = id;
						$scope.acceptMsg = "";
						$scope.errorAccMsg = $scope.response.message;
					}
				}
			});
		};

		/**
		 * Acknowledgement Dept Request
		 */

		$scope.ackDeptRequest = function (id) {
			$scope.errorAccMsg = "";
			$('#loaderNotification').show();
			lupaManagerService.ackRequest(id).then(function (response) {
				$('#loaderNotification').hide();
				$scope.response = JSON.parse(response.data.status_response);
				if (typeof $scope.response !== "undefined") {
					if ($scope.response.Success) {
						$scope.errorAccMsg = "";
						$scope.curId = id;
						$scope.acceptMsg = $scope.response.message;
					} else {
						$scope.curId = id;
						$scope.errorAccMsg = $scope.response.message;
						$scope.acceptMsg = "";
					}
				}
			});
		};

		/**
		 * Acknowledgement Dept Request
		 */

		$scope.ackAdminRequest = function (id) {
			$scope.errorAccMsg = "";
			$('#loaderNotification').show();
			lupaAdminService.ackRequest(id).then(function (response) {
				$('#loaderNotification').hide();
				$scope.response = JSON.parse(response.data.status_response);
				if (typeof $scope.response !== "undefined") {
					if ($scope.response.Success) {
						$scope.errorAccMsg = "";
						$scope.curId = id;
						$scope.acceptMsg = $scope.response.message;
					} else {
						$scope.curId = id;
						$scope.errorAccMsg = $scope.response.message;
					}
				}
			});
		};


		$scope.getSignOut = function () {
			localStorageService.clearAll();
			$location.path('/');
		};


	}]);

lupaApp.constant('appConstants', {
	serviceHeaders: {
		"POST": {
			"Content-Type": "application/json"
		},
		"GET": {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		"DELETE": {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	},
	'serviceAddress': 'http://kaizenat.com/LUPA'
}).filter('emptyFilter', function () {
	return function (array) {
		var filteredArray = [];
		angular.forEach(array, function (item) {
			//debugger;
			if (item.product_name != "" && item.product_name != undefined) {
				filteredArray.push(item);
			}
		});
		return filteredArray;
	};
});







