  lupaApp.controller('userLoginController', ['$scope','userData','lupaService','$location',function($scope,userData,lupaService,$location) {
   
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
      $scope.user ={
        email :"",
        password : ""
      };
      $scope.error ="";
      $scope.$watch('user', function (n, o) {
          if (n !== o){
            userData.setUser(n.email,n.password);
          };
      }, true);

      $scope.userAuth = function(){
        lupaService.loginUser().then(function(response) {
          console.log(response.data,"loginresponse");
          $scope.response = JSON.parse(response.data.status_response);
          console.log($scope.response,"is success");
          if($scope.response.success){
            $scope.error ="";
            $location.path('/dashboard');
          }else{
            $scope.error = $scope.response.message;
            $scope.user.password = "";
          }
        });
      }
  }]);
