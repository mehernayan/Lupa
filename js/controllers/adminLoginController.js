  lupaApp.controller('adminLoginController',['$scope','adminData','lupaService','$location',function($scope,adminData,lupaService,$location) {
   
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

    /* Login logic starts */
    $scope.admin ={
      email :"",
      password : ""
    };
    $scope.error ="";
    $scope.$watch('admin', function (n, o) {
        if (n !== o){
          adminData.set(n.email,n.password);
        };
    }, true);

    $scope.adminLogin = function(){
      lupaService.loginAdmin().then(function(response) {
        //console.log(response.data,"loginresponse");
        $scope.response = JSON.parse(response.data.status_respond);
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
  }]);
