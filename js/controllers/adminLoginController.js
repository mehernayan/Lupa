  lupaApp.controller('adminLoginController', function($scope) {
   
    $scope.isLogin = true;
    $scope.isReset = false;
    $scope.isOTP = false;

    $scope.getLoginForm = function(){
      $scope.isLogin = true;
      $scope.isReset = false;
      $scope.isOTP = false;
    };

    $scope.getResetForm = function(){
      $scope.isLogin = false;
      $scope.isReset = true;
      $scope.isOTP = false;
    };

    $scope.getOTPForm = function(){
      $scope.isLogin = false;
      $scope.isReset = false;
      $scope.isOTP = true;
    };
  });
