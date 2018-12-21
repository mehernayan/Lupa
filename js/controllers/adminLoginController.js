  lupaApp.controller('adminLoginController', ['$scope','userData','lupaAdminService','$location','userRegOtpVal','userEmailData','userResetData',
  function($scope,userData,lupaAdminService,$location,userRegOtpVal,userEmailData,userResetData) {
   
      $scope.isLogin = true;
      $scope.isReset = false;
      $scope.isOTP = false;
      $scope.isReg = false;
      $scope.isForgotPassword = true;

      $scope.getLoginForm = function(){
        $scope.isLogin = true;
        $scope.isReset = false;
        $scope.isOTP = false;
        $scope.error ="";
      };

      $scope.getResetForm = function(){
        $scope.isLogin = false;
        $scope.isReset = true;
        $scope.isOTP = false;
        $scope.isForgotPassword = true;
        $scope.error ="";
      };

      $scope.getOTPForm = function(){
        $scope.isLogin = false;
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
        lupaAdminService.fetchUserDeptList().then(function(response) {
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
        lupaAdminService.loginUser().then(function(response) {
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
        lupaAdminService.userRegOtp().then(function(response) {
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
        lupaAdminService.getUserForgotPasswordOtp().then(function(response) {
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
        lupaAdminService.validateUserForgotPasswordOtp().then(function(response) {
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
        lupaAdminService.resetUserPassword().then(function(response) {
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
