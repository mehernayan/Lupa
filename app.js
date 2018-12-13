	// create the module and name it lupaApp
	var lupaApp = angular.module('lupaApp', ['ngRoute']);
    console.log("git");
	// configure our routes
	lupaApp.config(function($routeProvider) {
		$routeProvider

	 .when('/', {
				templateUrl : 'views/userlogin.html',
				controller  : 'userLoginController'
			})

    .when('/userregister', {
				templateUrl : 'views/userregister.html',
				controller  : 'userRegisterController'
			})
      .when('/userforgotpassword', {
				templateUrl : 'views/userforgotpassword.html',
				controller  : 'userForgotPasswordController'
			})

     .when('/admin', {
				templateUrl : 'views/adminlogin.html',
				controller  : 'adminLoginController'
			})
      .when('/adminregister', {
				templateUrl : 'views/adminregister.html',
				controller  : 'adminRegisterController'
			})
      .when('/adminforgotpassword', {
				templateUrl : 'views/adminforgotpassword.html',
				controller  : 'adminForgotPasswordController'
			})

       .when('/manager', {
				templateUrl : 'views/managerlogin.html',
				controller  : 'managerLoginController'
			})
      .when('/managerregister', {
				templateUrl : 'views/managerregister.html',
				controller  : 'managerRegisterController'
			})
      .when('/managerforgotpassword', {
				templateUrl : 'views/managerforgotpassword.html',
				controller  : 'managerForgotPasswordController'
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
   



        


	