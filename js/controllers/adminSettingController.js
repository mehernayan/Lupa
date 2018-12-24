lupaApp.controller('adminSettingController',['$scope','lupaAdminService','addDepartmentData',
function($scope,lupaAdminService,addDepartmentData){
    $scope.tab = 1;
    $scope.setTab = function (tabId) {
        $scope.tab = tabId;
        if(tabId==1){
            $scope.getDepartmentList();
            $scope.getLicenseList();
        }else if(tabId==2){
            $scope.getDeptManagersList();
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
    $scope.errorManager ="";
    $scope.errorDeptlist ="";
    $scope.errorLicense ="";

    
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
       * Approve Dept managers list
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
       * Block Dept managers list
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
}]);
   