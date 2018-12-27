lupaApp.controller('deptSettingController', ['$scope','lupaManagerService','transferUserData',
function($scope,lupaManagerService,transferUserData){
    
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
    $scope.$watch('transUser', function (n, o) {
    if (n !== o){
        //console.log(n.todepartment,n.useremail,n.fromdepartment,n.username);
        transferUserData.set(n.todepartment,n.useremail,n.fromdepartment,n.username);
    };
    }, true);

    $scope.getTransferInfo = function (todepartment,useremail,fromdepartment,username) {
        $scope.transUser.todepartment = todepartment;
        $scope.transUser.useremail = useremail;
        $scope.transUser.fromdepartment = fromdepartment;
        $scope.transUser.username = username;
    }

    $scope.transferUser = function(){
      $('#loadergif').show();
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
    };
}]);
   