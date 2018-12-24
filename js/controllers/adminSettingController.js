lupaApp.controller('adminSettingController',['$scope','lupaAdminService','addDepartmentData',
function($scope,lupaAdminService,addDepartmentData){
    $scope.tab = 1;
    $scope.setTab = function (tabId) {
        $scope.tab = tabId;
    };
    $scope.isSet = function (tabId) {
        return $scope.tab === tabId;
    };

    $scope.error ="";
    $scope.successMsg ="";

    /**
     * Fetch user and dept list
     */
    $scope.departments = [];
    $scope.errorDeptlist ="";
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
}]);
   