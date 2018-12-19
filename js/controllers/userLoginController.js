  lupaApp.controller('userLoginController', ['$scope','userData','userRegData','lupaService','$location',function($scope,userData,userRegData,lupaService,$location) {
   
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
      /*
      *
      */
      $scope.userLogin = function(){
        lupaService.loginUser().then(function(response) {
          //console.log(response.data,"loginresponse");
          $scope.response = JSON.parse(response.data.status_response);
          //console.log($scope.response,"is success");
          if($scope.response.success){
            $scope.error ="";
            $location.path('/dashboard');
          }else{
            $scope.error = $scope.response.message;
            $scope.user.password = "";
          }
        });
      };

      /** user register */
      $scope.userReg = {
        name : '',
        email : '',
        phone : '',
        department : '',
        password :'',
        password_confirmation :''
      };
      $scope.$watch('userReg', function (n, o) {
        if (n !== o){
          userRegData.setUser(n.name,n.email,n.phone,n.department,n.password,n.password_confirmation);
        };
    }, true);

      $scope.userRegister = function(){
        //if($scope.confPassword === $scope.userReg.password){
          $scope.error = "";
          lupaService.registerUser().then(function(response) {
            //console.log(response.data,"register user");
            $scope.response = JSON.parse(response.data.status_response);
            //console.log($scope.response,"is success");
            if($scope.response.Success){
              $scope.error ="";
              $scope.getOTPForm();
            }else{
              $scope.error = $scope.response.message;
              $scope.user.password = "";
            }
          });
      };
  }]);
