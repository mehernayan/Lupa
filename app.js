	// create the module and name it lupaApp
	var lupaApp = angular.module('lupaApp', ['ngRoute']);

	// configure our routes
	lupaApp.config(function($routeProvider) {
		$routeProvider

	.when('/', {
				templateUrl : 'views/userlogin.html',
				controller  : 'userLoginController'
	})

	.when('/admin', {
		templateUrl : 'views/adminlogin.html',
		controller  : 'adminLoginController'
	})
	
	.when('/manager', {
		templateUrl : 'views/managerlogin.html',
		controller  : 'managerLoginController'
	})
			
    .when('/dashboard', {
      	templateUrl : 'views/dashboard.html',
      	controller  : 'dashboardController'
    })
	.when('/userprofilesetting', {
		templateUrl : 'views/userprofilesetting.html',
		controller  : 'userPSettingController'
	})
	.when('/adminprofilesetting', {
		templateUrl : 'views/adminprofilesetting.html',
		controller  : 'adminPSettingController'
	})
	.when('/deptprofilesetting', {
		templateUrl : 'views/deptprofilesetting.html',
		controller  : 'deptPSettingController'
	})
	.when('/adminsetting', {
		templateUrl : 'views/adminsetting.html',
		controller  : 'adminSettingController'
	})
	.when('/deptsetting', {
		templateUrl : 'views/deptsetting.html',
		controller  : 'deptSettingController'
	})			
	});
  lupaApp.controller('mainController', function($scope) {
		// create a message to display in our view
		$scope.message = 'Everyone come and see how good I look!';
  });
   



        


	