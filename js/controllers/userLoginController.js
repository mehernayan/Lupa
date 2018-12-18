  lupaApp.controller('userLoginController', ['$scope','userData','lupaService',function($scope,userData,lupaService) {
   
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
      

    /* Login logic starts */
      $scope.user ={};
      $scope.$watch('user', function (n, o) {
          if (n !== o){
            userData.setUser(n.email,n.password);
          };
      });

      $scope.userAuth = function(){
        lupaService.loginUser().then(function(response) {
          console.log(response,"loginresponse");
        });
      }
  }]);
