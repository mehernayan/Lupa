lupaApp.controller('adminSettingController',['$scope','lupaAdminService','addDepartmentData','transferUserData',
function($scope,lupaAdminService,addDepartmentData,transferUserData){
    $scope.tab = 1;
    $scope.setTab = function (tabId) {
        $scope.tab = tabId;
        if(tabId==1){
            $scope.getDepartmentList();
            $scope.getLicenseList();
        }else if(tabId==2){
            $scope.getDeptManagersList();
        }else if(tabId==3){
            $scope.getUsersList();
            $scope.getTransDepartmentList();
        }
    };
    $scope.isSet = function (tabId) {
        return $scope.tab === tabId;
    };

    $scope.error ="";
    $scope.successMsg ="";
    $scope.departments = [];
    $scope.licenses = [];
    $scope.deptManagers = [];
    $scope.usersList = [];
    $scope.transDepartments =[];
    $scope.errorTransDeptList ="";
    $scope.errorManager ="";
    $scope.errorDeptlist ="";
    $scope.errorLicense ="";
    $scope.errorUsersList="";

    
    /** get Department list */
    $scope.getDepartmentList = function(){
      $('#loadergif').show();
      lupaAdminService.fetchDepartmentList().then(function(response) {
        //console.log(response.data,"register user");
        $scope.response = JSON.parse(response.data.status_response);
        $('#loadergif').hide();
        if(typeof $scope.response!=="undefined"){
          if($scope.response.Success){
            $scope.errorDeptlist ="";
            $scope.departments = $scope.response.data;
          }else{
            $scope.errorDeptlist = $scope.response.message;
          }
        }
      });
    };
    $scope.getDepartmentList();

    /** get Licenses list */
    $scope.getLicenseList = function(){
        $('#loadergif').show();
        lupaAdminService.fetchLicenseList().then(function(response) {
          //console.log(response.data,"register user");
          $scope.response = JSON.parse(response.data.status_response);
          $('#loadergif').hide();
          if(typeof $scope.response!=="undefined"){
            if($scope.response.success){
              $scope.errorLicense ="";
              $scope.licenses = $scope.response.data;
            }else{
              $scope.errorLicense = $scope.response.message;
            }
          }
        });
      };
      $scope.getLicenseList();

    /**
     * Add Department
     */
    
    $scope.department = {
        department : ''
    };
    $scope.$watch('department', function (n, o) {
    if (n !== o){
        console.log(n.department);
        addDepartmentData.set(n.department);
    };
    }, true);
    $scope.addDepartment = function(){
      $('#loadergif').show();
      lupaAdminService.addDepartment().then(function(response) {
        //console.log(response.data,"register user");
        $scope.response = JSON.parse(response.data.status_response);
        $('#loadergif').hide();
        if(typeof $scope.response!=="undefined"){
          if($scope.response.Success){
            $scope.error ="";
            $scope.successMsg = $scope.response.message;
            $scope.department = {
                department : ''
            };
          }else{
            $scope.successMsg = "";
            $scope.error = $scope.response.message;
          }
          $scope.getDepartmentList();
        }
      });
    };

    /**Delete department */
    $scope.deleteDepartment = function(id){
        $('#loadergif').show();
        lupaAdminService.delteDepartment(id).then(function(response) {
          //console.log(response.data,"register user");
          $scope.response = JSON.parse(response.data.status_response);
          $('#loadergif').hide();
          if(typeof $scope.response!=="undefined"){
            if($scope.response.Success){
              $scope.error ="";
              $scope.successMsg = $scope.response.message;
            }else{
              $scope.successMsg = "";
              $scope.error = $scope.response.message;
            }
            $scope.getDepartmentList();
          }
        });
      };

      /** 
       * Fetch Dept managers list
       */
        $scope.getDeptManagersList = function(){
        $('#loadergif').show();
        lupaAdminService.fetchDeptManagersList().then(function(response) {
          //console.log(response.data,"register user");
          $scope.response = JSON.parse(response.data.status_response);
          $('#loadergif').hide();
          if(typeof $scope.response!=="undefined"){
            if($scope.response.Success){
              $scope.errorManager ="";
              $scope.deptManagers = $scope.response.data;
            }else{
              $scope.errorManager = $scope.response.message;
            }
          }
        });
      };

      /** 
       * Approve Dept manager
       */
      $scope.approveDeptManager = function(id){
        $('#loadergif').show();
        lupaAdminService.approveDeptManager(id).then(function(response) {
          //console.log(response.data,"register user");
          $scope.response = JSON.parse(response.data.status_response);
          $('#loadergif').hide();
          if(typeof $scope.response!=="undefined"){
            if($scope.response.Success){
              $scope.error ="";
              $scope.getDeptManagersList();
              $scope.successMsg =$scope.response.message;
            }else{
              $scope.successMsg ="";
              $scope.error = $scope.response.message;
            }
          }
        });
      };

      /** 
       * Block Dept manager
       */
      $scope.blockDeptManager = function(id){
        $('#loadergif').show();
        lupaAdminService.blockDeptManager(id).then(function(response) {
          //console.log(response.data,"register user");
          $scope.response = JSON.parse(response.data.status_response);
          $('#loadergif').hide();
          if(typeof $scope.response!=="undefined"){
            if($scope.response.Success){
              $scope.error ="";
              $scope.getDeptManagersList();
              $scope.successMsg =$scope.response.message;
            }else{
              $scope.successMsg ="";
              $scope.error = $scope.response.message;
            }
          }
        });
      };

      /** 
       * Delete Dept manager
       */
      $scope.deleteDeptManager = function(id){
        $('#loadergif').show();
        lupaAdminService.deleteDeptManager(id).then(function(response) {
          //console.log(response.data,"register user");
          $scope.response = JSON.parse(response.data.status_response);
          $('#loadergif').hide();
          if(typeof $scope.response!=="undefined"){
            if($scope.response.Success){
              $scope.error ="";
              $scope.getDeptManagersList();
              $scope.successMsg =$scope.response.message;
            }else{
              $scope.successMsg ="";
              $scope.error = $scope.response.message;
            }
          }
        });
      };

       /** 
       * Fetch Users list
       */
      $scope.getUsersList = function(){
        $('#loadergif').show();
        lupaAdminService.fetchUsersList().then(function(response) {
          $scope.response = JSON.parse(response.data.status_response);
          $('#loadergif').hide();
          if(typeof $scope.response!=="undefined"){
            if($scope.response.Success){
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
        lupaAdminService.blockUser(id).then(function(response) {
          $scope.response = JSON.parse(response.data.status_response);
          $('#loadergif').hide();
          if(typeof $scope.response!=="undefined"){
            if($scope.response.Success){
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
        lupaAdminService.unBlockUser(id).then(function(response) {
          $scope.response = JSON.parse(response.data.status_response);
          $('#loadergif').hide();
          if(typeof $scope.response!=="undefined"){
            if($scope.response.Success){
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
        lupaAdminService.deleteUser(id).then(function(response) {
          $scope.response = JSON.parse(response.data.status_response);
          $('#loadergif').hide();
          if(typeof $scope.response!=="undefined"){
            if($scope.response.Success){
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
        lupaAdminService.getTransDepartmentList().then(function(response) {
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
      lupaAdminService.transferUser().then(function(response) {
        //console.log(response.data,"register user");
        $scope.response = JSON.parse(response.data.status_response);
        $('#loadergif').hide();
        if(typeof $scope.response!=="undefined"){
          if($scope.response.Success){
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
   