  lupaApp.controller('userLoginController', ['$scope','userData','userRegData','lupaUserService','$location','userRegOtpVal','userEmailData','userResetData',
  function($scope,userData,userRegData,lupaUserService,$location,userRegOtpVal,userEmailData,userResetData) {
   
      $scope.isLogin = true;
      $scope.isRegister = false;
      $scope.isReset = false;
      $scope.isOTP = false;
      $scope.isReg = false;
      $scope.isForgotPassword = true;

      $scope.getLoginForm = function(){
        $scope.isLogin = true;
        $scope.isRegister = false;
        $scope.isReset = false;
        $scope.isOTP = false;
        $scope.error ="";
      };

      $scope.getRegisterForm = function(){
        $scope.isLogin = false;
        $scope.isRegister = true;
        $scope.isReset = false;
        $scope.isOTP = false;
        $scope.error ="";
        $scope.getUserDeptList();
      };

      $scope.getResetForm = function(){
        $scope.isLogin = false;
        $scope.isRegister = false;
        $scope.isReset = true;
        $scope.isOTP = false;
        $scope.isForgotPassword = true;
        $scope.error ="";
      };

      $scope.getOTPForm = function(){
        $scope.isLogin = false;
        $scope.isRegister = false;
        $scope.isReset = false;
        $scope.isOTP = true;
        $scope.confirmOTP = true;
        $scope.error ="";
      };
      
      /**
       * Fetch user and dept list
       */
      $scope.errorUserlist ="";
      $scope.getUserDeptList = function(){
        lupaUserService.fetchUserDeptList().then(function(response) {
          //console.log(response.data,"register user");
          $scope.response = JSON.parse(response.data.status_response);
          //console.log($scope.response,"is success");
          if(typeof $scope.response!=="undefined"){
            if($scope.response.Success){
              $scope.errorUserlist ="";
              $scope.userNames = $scope.response.userlist;
              $scope.deptNames = $scope.response.deparments_list;
            }else{
              $scope.errorUserlist = $scope.response.message;
            }
          }
        });
      };
      

    /* Login logic starts */
      $scope.user ={
        email :"",
        password : ""
      };
      $scope.error ="";
      $scope.$watch('user', function (n, o) {
          if (n !== o){
            userData.set(n.email,n.password);
          };
      }, true);
      
      $scope.userLogin = function(){
        lupaUserService.loginUser().then(function(response) {
          //console.log(response.data,"loginresponse");
          $scope.response = JSON.parse(response.data.status_response);
          //console.log($scope.response,"is success");
          if(typeof $scope.response!=="undefined"){
            if($scope.response.success){
              $scope.error ="";
              $location.path('/dashboard');
            }else{
              $scope.error = $scope.response.message;
              $scope.user.password = "";
            }
          }
        });
      };

      /** user register */
      $scope.userReg = {
        name : '',
        email : '',
        department : '',
        password :'',
        password_confirmation :''
      };
      $scope.$watch('userReg', function (n, o) {
        if (n !== o){
          userRegData.set(n.name.username,n.email,n.department.department_name,n.password,n.password_confirmation);
        };
    }, true);

      $scope.userRegister = function(){
          $scope.error = "";
          lupaUserService.registerUser().then(function(response) {
            //console.log(response.data,"register user");
            $scope.response = JSON.parse(response.data.status_response);
            //console.log($scope.response,"is success");
            if(typeof $scope.response!=="undefined"){
              if($scope.response.success){
                $scope.error ="";
                $scope.getOTPForm();
                $scope.isReg = true;
              }else{
                $scope.error = $scope.response.message;
              }
            }
          });
      };

      /**
       * OTP
       */
      $scope.getCodeBoxElement = function(index) {
        return document.getElementById('codeBox' + index);
      };
      $scope.otpVal = "";
      $scope.onKeyUpEvent = function(index, event) {
        const eventCode = event.which || event.keyCode;
        if ($scope.getCodeBoxElement(index).value.length === 1) {
          if (index !== 6) {
            $scope.otpVal = $scope.otpVal + $scope.getCodeBoxElement(index).value;
            $scope.getCodeBoxElement(index+ 1).focus();
          } else {
            $scope.getCodeBoxElement(index).blur();
            $scope.confirmOTP = false;
            $scope.otpVal = $scope.otpVal + $scope.getCodeBoxElement(index).value;
            $scope.otp = parseInt($scope.otpVal);
            userRegOtpVal.set($scope.otp);
            console.log($scope.otp,"otp")
          }
        }
        if (eventCode === 8 && index !== 1) {
          $scope.getCodeBoxElement(index - 1).focus();
        }
      };
      $scope.onFocusEvent = function(index) {
        for (item = 1; item < index; item++) {
          const currentElement = $scope.getCodeBoxElement(item);
          if (!currentElement.value) {
              currentElement.focus();
              break;
          }
        }
      };

      /**
       * User reg OTP validation
       */
      $scope.validateUserRegOtp = function(){
        $scope.error = "";
        lupaUserService.userRegOtp().then(function(response) {
          //console.log(response.data,"register user");
          $scope.response = JSON.parse(response.data.status_response);
          //console.log($scope.response,"is success");
          if(typeof $scope.response!=="undefined"){
            if($scope.response.success){
              $scope.error ="";
              $scope.getLoginForm();
            }else{
              $scope.error = $scope.response.message;
            }
        }
        });
      };

      /** user forgot password email */
      $scope.userEmail = {
        email : ''
      };
      $scope.$watch('userEmail', function (n, o) {
        if (n !== o){
          userEmailData.set(n.email);
        };
    }, true);

      /**
       * User password OTP validation
       */
      $scope.getUserForgotPasswordOtp = function(){
        $scope.error = "";
        lupaUserService.getUserForgotPasswordOtp().then(function(response) {
          //console.log(response.data,"register user");
          $scope.response = JSON.parse(response.data.status_response);
          //console.log($scope.response,"is success");
          if($scope.response.success){
            $scope.error ="";
            $scope.getOTPForm();
            $scope.isReg = false;
          }else{
            $scope.error = $scope.response.message;
          }
        });
      };

      $scope.validateUserPasswordOtp = function(){
        $scope.error = "";
        lupaUserService.validateUserForgotPasswordOtp().then(function(response) {
          //console.log(response.data,"register user");
          $scope.response = JSON.parse(response.data.status_response);
          //console.log($scope.response,"is success");
          if($scope.response.success){
            $scope.error ="";
            $scope.getResetForm();
            $scope.isForgotPassword = false;
          }else{
            $scope.error = $scope.response.message;
          }
        });
      };

      /** user forgot password email */
      $scope.resetUser = {
        email : '',
        password : '',
        password_confirmation : ''
      };
      $scope.$watch('resetUser', function (n, o) {
        if (n !== o){
          userResetData.set(n.email,n.password,n.password_confirmation);
        };
      }, true);
      $scope.resetUserPassword = function(){
        $scope.error = "";
        lupaUserService.resetUserPassword().then(function(response) {
          //console.log(response.data,"register user");
          $scope.response = JSON.parse(response.data.status_response);
          //console.log($scope.response,"is success");
          if($scope.response.success){
            $scope.error ="";
            $scope.getLoginForm();
          }else{
            $scope.error = $scope.response.message;
          }
        });
      };
      
  }]);
