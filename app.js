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

			
	});
  lupaApp.controller('mainController', function($scope) {
		// create a message to display in our view
		$scope.message = 'Everyone come and see how good I look!';
  });
   



        


	