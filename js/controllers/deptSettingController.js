lupaApp.controller('deptSettingController', ['$scope','$location','lupaManagerService','transferUserData','localStorageService',
function($scope,$location,lupaManagerService,transferUserData,localStorageService){
  var userId = localStorageService.get("user");
  if(typeof userId ==="undefined" || userId == null) {
      $location.path('/');
  }
    $scope.tab = 3;
    $scope.setTab = function (tabId) {
        $scope.tab = tabId;
        if(tabId==3){
            $scope.getUsersList();
            $scope.getTransDepartmentList();
        }
    };
    $scope.isSet = function (tabId) {
        return $scope.tab === tabId;
    };

    $scope.error ="";
    $scope.successMsg ="";
    $scope.usersList = [];
    $scope.transDepartments =[];
    $scope.errorTransDeptList ="";
    $scope.errorUsersList="";


    /** 
       * Fetch Users list
       */
      $scope.getUsersList = function(){
        $('#loadergif').show();
        lupaManagerService.fetchUsersList().then(function(response) {
          $scope.response = JSON.parse(response.data.status_response);
          $('#loadergif').hide();
          if(typeof $scope.response!=="undefined"){
            if($scope.response.success){
              $scope.errorUsersList ="";
              $scope.usersList =$scope.response.data;
            }else{
              $scope.errorUsersList = $scope.response.message;
            }
          }
        });
      };

       /** 
       * block user from Users list
       */
      $scope.blockUser = function(id){
        $('#loadergif').show();
        $scope.error ="";
        $scope.successMsg = "";
        lupaManagerService.blockUser(id).then(function(response) {
          $scope.response = JSON.parse(response.data.status_response);
          $('#loadergif').hide();
          if(typeof $scope.response!=="undefined"){
            if($scope.response.success){
                $scope.error ="";
                $scope.successMsg = $scope.response.message;
              }else{
                $scope.successMsg = "";
                $scope.error = $scope.response.message;
              }
              $scope.getUsersList();
          }
        });
      };

      /** 
       * Unblock user from Users list
       */
      $scope.unBlockUser = function(id){
        $('#loadergif').show();
        $scope.error ="";
        $scope.successMsg = "";
        lupaManagerService.unBlockUser(id).then(function(response) {
          $scope.response = JSON.parse(response.data.status_response);
          $('#loadergif').hide();
          if(typeof $scope.response!=="undefined"){
            if($scope.response.success){
              $scope.error ="";
              $scope.successMsg = $scope.response.message;
            }else{
              $scope.successMsg = "";
              $scope.error = $scope.response.message;
            }
            $scope.getUsersList();
          }
        });
      };

      /** 
       * Delete user from Users list
       */
      $scope.deleteUser = function(id){
        $('#loadergif').show();
        $scope.error ="";
        $scope.successMsg = "";
        lupaManagerService.deleteUser(id).then(function(response) {
          $scope.response = JSON.parse(response.data.status_response);
          $('#loadergif').hide();
          if(typeof $scope.response!=="undefined"){
            if($scope.response.success){
              $scope.error ="";
              $scope.successMsg = $scope.response.message;
            }else{
              $scope.successMsg = "";
              $scope.error = $scope.response.message;
            }
            $scope.getUsersList();
          }
        });
      };

      /** 
       * Fetch Department list to Tranfer User
       */
      $scope.getTransDepartmentList = function(){
        $('#loadergif').show();
        lupaManagerService.getTransDepartmentList().then(function(response) {
          $scope.response = JSON.parse(response.data.status_response);
          $('#loadergif').hide();
          if(typeof $scope.response!=="undefined"){
            if($scope.response.Success){
              $scope.errorTransDeptList ="";
              $scope.transDepartments =$scope.response.data;
            }else{
              $scope.errorTransDeptList = $scope.response.message;
            }
          }
        });
      };

      $scope.getUsersList();
      $scope.getTransDepartmentList();

      /**
     * Transfer user to department
     */
    
    $scope.transUser = {
        todepartment : '',
        useremail : '',
        fromdepartment : '',
        username : ''
    };
    
    $scope.transferUser = function(user){
      if(typeof user.todepartment !=="undefined"){
        $('#loadergif').show();
        $scope.transUser.todepartment = user.todepartment.department;
        $scope.transUser.useremail = user.email;
        $scope.transUser.fromdepartment = user.department;
        $scope.transUser.username = user.name;
        transferUserData.set($scope.transUser.todepartment,$scope.transUser.useremail,$scope.transUser.fromdepartment,$scope.transUser.username)
    
        lupaManagerService.transferUser().then(function(response) {
          //console.log(response.data,"register user");
          $scope.response = JSON.parse(response.data.status_response);
          $('#loadergif').hide();
          if(typeof $scope.response!=="undefined"){
            if($scope.response.success){
              $scope.error ="";
              $scope.successMsg = $scope.response.message;
            }else{
              $scope.successMsg = "";
              $scope.error = $scope.response.message;
            }
            $scope.getUsersList();
          }
        });
      }
    };
}]);
   