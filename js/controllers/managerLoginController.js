lupaApp.controller('managerLoginController', ['$scope','userData','userRegData','lupaManagerService','$location','userRegOtpVal','userEmailData','userResetData','localStorageService','notificationId',
function($scope,userData,userRegData,lupaManagerService,$location,userRegOtpVal,userEmailData,userResetData,localStorageService,notificationId) {
    $scope.expirationMsg ="";
    var licence = localStorageService.get("licence_days");
    if(typeof licence ==="undefined" || licence == null) {
        $location.path('/');
    }else{
      if(licence <= 5){
        $scope.expirationMsg = licence +"days to expire your licence!"
      } 
    }
    $scope.isLogin = true;
    $scope.isRegister = false;
    $scope.isReset = false;
    $scope.isOTP = false;
    $scope.isReg = false;
    $scope.isForgotPassword = true;
    $scope.successMsg = "";
    $scope.isResetDone = false;
    $scope.isRegDone = false;

    $scope.getLoginForm = function(){
      $scope.isLogin = true;
      $scope.isRegister = false;
      $scope.isReset = false;
      $scope.isOTP = false;
      $scope.error ="";
      $scope.successMsg = "";
    };

    $scope.getRegisterForm = function(){
      $scope.isLogin = false;
      $scope.isRegister = true;
      $scope.isReset = false;
      $scope.isOTP = false;
      $scope.error ="";
      $scope.successMsg = "";
      $scope.getUserDeptList();
    };

    $scope.getResetForm = function(){
      $scope.isLogin = false;
      $scope.isRegister = false;
      $scope.isReset = true;
      $scope.isOTP = false;
      $scope.isForgotPassword = true;
      $scope.error ="";
      $scope.successMsg = "";
    };

    $scope.getOTPForm = function(){
      $scope.isLogin = false;
      $scope.isRegister = false;
      $scope.isReset = false;
      $scope.isOTP = true;
      $scope.confirmOTP = true;
      $scope.error ="";
      $scope.successMsg = "";
    };
    
    /**
     * Fetch user and dept list
     */
    $scope.errorUserlist ="";
    $scope.getUserDeptList = function(){
      $('#loadergif').show();
      lupaManagerService.fetchDeptList().then(function(response) {
        $('#loadergif').hide();
        //console.log(response.data,"register user");
        $scope.response = JSON.parse(response.data.status_response);
        //console.log($scope.response,"is success");
        if(typeof $scope.response!=="undefined"){
          if($scope.response.Success){
            $scope.errorUserlist ="";
            $scope.deptNames = $scope.response.data;
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
      $scope.error ="";
      $('#loadergif').show();
      lupaManagerService.loginUser().then(function(response) {
        $('#loadergif').hide();
        //console.log(response.data,"loginresponse");
        $scope.response = JSON.parse(response.data.status_response);
        //console.log($scope.response,"is success");
        if(typeof $scope.response!=="undefined"){
          if($scope.response.success){
            $scope.error ="";
            localStorageService.set("user",$scope.response.data);
            localStorageService.set("productlist",$scope.response.products_list);
            notificationId.set($scope.response.data[0].id);
            $location.path('/deptdashboard');
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
        userRegData.set(n.name,n.email,n.department.department_name,n.password,n.password_confirmation);
      };
  }, true);

    $scope.userRegister = function(){
        $scope.error = "";
        $('#loadergif').show();
        lupaManagerService.registerUser().then(function(response) {
          $('#loadergif').hide();
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
    $scope.otpVal = "";
    $scope.getCodeBoxElement = function(index) {
      return document.getElementById('codeBox' + index);
    };
    $scope.getOtp = function(){
      $scope.otpVal = "";
      for(let box=1; box < 7;box++){
        $scope.otpVal += document.getElementById('codeBox'  + box).value;
      }
      return $scope.otpVal;
    };
    $scope.onKeyUpEvent = function(index, event) {
      const eventCode = event.which || event.keyCode;
      if ($scope.getCodeBoxElement(index).value.length === 1) {
        if (index !== 6) {
          $scope.getCodeBoxElement(index+ 1).focus();
        } else {
          $scope.getCodeBoxElement(index).blur();
          $scope.confirmOTP = false;
          $scope.otpVal = $scope.getOtp();
          $scope.otp = parseInt($scope.otpVal);
          userRegOtpVal.set($scope.otp);
          console.log($scope.otp,"otp");
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
      $scope.successMsg = "";
      $('#loadergif').show();
      lupaManagerService.userRegOtp().then(function(response) {
        $('#loadergif').hide();
        //console.log(response.data,"register user");
        $scope.response = JSON.parse(response.data.status_response);
        //console.log($scope.response,"is success");
        if(typeof $scope.response!=="undefined"){
          if($scope.response.success){
            $scope.error ="";
            $scope.successMsg = $scope.response.message;
            $scope.isRegDone =true;
          }else{
            $scope.successMsg = "";
            $scope.isRegDone =false;
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
      $('#loadergif').show();
      lupaManagerService.getUserForgotPasswordOtp().then(function(response) {
        $('#loadergif').hide();
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
      $scope.successMsg ="";
      $('#loadergif').show();
      lupaManagerService.validateUserForgotPasswordOtp().then(function(response) {
        $('#loadergif').hide();
        //console.log(response.data,"register user");
        $scope.response = JSON.parse(response.data.status_response);
        //console.log($scope.response,"is success");
        if($scope.response.success){
          $scope.error ="";
          $scope.getResetForm();
          $scope.resetUser.email = userEmailData.get().email;
          $scope.successMsg = $scope.response.message;
          $scope.isForgotPassword = false;
        }else{
          $scope.successMsg ="";
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
      $scope.successMsg ="";
      $('#loadergif').show();
      lupaManagerService.resetUserPassword().then(function(response) {
        $('#loadergif').hide();
        //console.log(response.data,"register user");
        $scope.response = JSON.parse(response.data.status_response);
        //console.log($scope.response,"is success");
        if($scope.response.success){
          $scope.error ="";
          $scope.isReset = true;
          $scope.isResetDone = true;
          $scope.successMsg =$scope.response.message;
        }else{
          $scope.successMsg ="";
          $scope.error = $scope.response.message;
          $scope.isResetDone = false;
        }
      });
    };
    
}]);
