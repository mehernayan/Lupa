  lupaApp.controller('userLoginController', function($scope) {
   
      $scope.isLogin = true;
      $scope.isRegister = false;
      $scope.isReset = false;
      $scope.isOTP = false;

      $scope.getLoginForm = function(){
        $scope.isLogin = true;
        $scope.isRegister = false;
        $scope.isReset = false;
        $scope.isOTP = false;
      };

      $scope.getRegisterForm = function(){
        $scope.isLogin = false;
        $scope.isRegister = true;
        $scope.isReset = false;
        $scope.isOTP = false;
      };

      $scope.getResetForm = function(){
        $scope.isLogin = false;
        $scope.isRegister = false;
        $scope.isReset = true;
        $scope.isOTP = false;
      };

      $scope.getOTPForm = function(){
        $scope.isLogin = false;
        $scope.isRegister = false;
        $scope.isReset = false;
        $scope.isOTP = true;
      };
  });
