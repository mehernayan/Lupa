// create the module and name it lupaApp
var lupaApp = angular.module('lupaApp', ['ngRoute', 'lupaUserProvider', 'lupaAdminProvider', 'lupaManagerProvider', 'lupaSharedProvider', 'lupaUserDashboardProvider', 'LocalStorageModule','FBAngular']);

// configure our routes
lupaApp.config(function ($routeProvider, $httpProvider) {
	$routeProvider

		.when('/', {
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

		.when('/userdashboard', {
			templateUrl: 'views/userdashboard.html',
			controller: 'userDashboardController'
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
		.when('/userreport', {
			templateUrl: 'views/userreport.html',
			controller: 'userReportController'
		})
		.when('/userfavourite', {
			templateUrl: 'views/userfavourite.html',
			controller: 'userFavouriteController'
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
lupaApp.controller('mainController', ['$scope', '$timeout', '$window', 'localStorageService', '$location',
	function ($scope, $timeout, $window, localStorageService, $location) {
		// create a message to display in our view
		$scope.message = 'Everyone come and see how good I look!';
		$scope.username = "";
		$scope.userType = "";
		$scope.headInit = function () {
			$scope.user = localStorageService.get('user');
			if (typeof $scope.user !== "undefined" && $scope.user !== [] && $scope.user !== null) {
				$scope.username = $scope.user[0].name;
				$scope.userType = $scope.user[0].userType;
			}
		};

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
		$scope.downloadChart = function ($event) {
			$($event.target.closest('.chart-container')).find('a[data-title*="Download plot as a png"]')[0].click();
		}

		$timeout(function () {
			$("#product li").on("click", function (event) {
				event.stopPropagation();
			})
		}, 2000);

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
})







