lupaApp.controller('adminSettingController',['$scope','$location','lupaAdminService','addDepartmentData','transferUserData','localStorageService','$filter',
function($scope,$location,lupaAdminService,addDepartmentData,transferUserData,localStorageService, $filter){
    var userId = localStorageService.get("user");
    if(typeof userId ==="undefined" || userId == null) {
        $location.path('/');
    }
    $scope.reportSidebar = true;
    $scope.favouriteActive = false;
    $scope.dashboardActive = false;
    $scope.tab = 1;
    $scope.setTab = function (tabId) {
        $scope.tab = tabId;
        if(tabId==1){
            $scope.error ="";
            $scope.successMsg ="";
            $scope.getDepartmentList();
            $scope.getLicenseList();
        }else if(tabId==2){
            $scope.error ="";
            $scope.successMsg ="";
            $scope.getDeptManagersList();
        }else if(tabId==3){
            $scope.error ="";
            $scope.successMsg ="";
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
    $scope.deleteId = undefined;
    $scope.deleteDept = undefined;
    $scope.deleteDepartmentConf = function(id,deptName){
        $scope.deleteId = id;
        $scope.deleteDept = deptName;
    }

    $scope.deleteDepartment = function(){
        $('#loadergif').show();
        if($scope.deleteId !== undefined){
          lupaAdminService.delteDepartment($scope.deleteId).then(function(response) {
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
            $("#deleteDeptModal").modal('hide');
          });
        }
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
      $scope.deleteManagerId = undefined;
      $scope.deleteDeptManagerName = undefined;
      $scope.deleteDeptManagerConf = function(id,managerName){
          $scope.deleteManagerId = id;
          $scope.deleteDeptManagerName = managerName;
      }
      $scope.deleteDeptManager = function(){
        $('#loadergif').show();
        if($scope.deleteManagerId !== undefined){
          lupaAdminService.deleteDeptManager($scope.deleteManagerId).then(function(response) {
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
              $scope.getDeptManagersList();
            }
            $("#deleteManagerModal").modal('hide');
          });
        }
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
      $scope.deleteUserId = undefined;
      $scope.deleteUserName = undefined;
      $scope.deleteUserConf = function(id,userName){
          $scope.deleteUserId = id;
          $scope.deleteUserName = userName;
      }
      $scope.deleteUser = function(){
        $('#loadergif').show();
        $scope.error ="";
        $scope.successMsg = "";
        if($scope.deleteUserId !== undefined){
          lupaAdminService.deleteUser($scope.deleteUserId).then(function(response) {
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
            $("#deleteUserModal").modal('hide');
          });
        }
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
   

    $scope.transferUser = function(user){
      
      if(typeof user.todepartment !=="undefined"){
          $('#loadergif').show();
          $scope.transUser.todepartment = user.todepartment.department;
          $scope.transUser.useremail = user.email;
          $scope.transUser.fromdepartment = user.department;
          $scope.transUser.username = user.name;
          transferUserData.set($scope.transUser.todepartment,$scope.transUser.useremail,$scope.transUser.fromdepartment,$scope.transUser.username)
      
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
      }
      
    };

    $scope.showDept = function(dept){
        $(".deptbtn .btnvalue").text(dept);
    };
    $scope.addThisWeekShift = function(shiftName,shiftStart,shiftEnd) {
      if(shiftStart != "" && shiftStart != undefined && shiftEnd != "" && shiftEnd != undefined && shiftName != "" && shiftName != undefined) {
      shiftStart = $filter("date")(shiftStart, 'HH:mm:ss');
      shiftEnd = $filter("date")(shiftEnd, 'HH:mm:ss');
      $('#loadergif').show();
      lupaAdminService.addThisWeekShiftUrl(shiftName,shiftStart,shiftEnd).then(function(response) {
          $('#loadergif').hide();
          if(typeof $scope.response!=="undefined"){
            if($scope.response.Success){
              $scope.shiftCreated = true;
              $scope.shiftFieldValidation =  false;
              }else{
              
            }
          }
      });
      }
      else {
        $scope.shiftCreated = false;
        $scope.shiftFieldValidation =  true;     
       }
      
    };

   

    $scope.getThisWeekShifts = function() {
      $('#loadergif').show();
      lupaAdminService.getThisWeekShiftsUrl().then(function(response) {
          $('#loadergif').hide();
          $scope.response = JSON.parse(response.data.status_response);
          if(typeof $scope.response!=="undefined"){
            if($scope.response.Success){
               $scope.shiftList = $scope.response.data;
               $scope.deletedId = $scope.shiftList[0].id;
               $scope.selectedShift = $scope.shiftList[0].shift_name;
               //debugger;
             
            }else{
              
            }
          }
      });      
    };
    $scope.getThisWeekShifts();
    $scope.thisWeekShiftChange = function (selectedShift) {
      $scope.deletedId = selectedShift.id;
    }
    var deletedId  = $scope.deletedId;
      $scope.deleteShiftId = undefined;
      $scope.deleteShiftName = undefined;
      $scope.deleteShiftByIdConf = function(id,shiftName){
          $scope.deleteShiftId = id;
          $scope.deleteShiftName = shiftName;
      }
    $scope.deleteShiftById = function () {
          if($scope.deleteShiftId !== undefined) {
            $('#loadergif').show();
            lupaAdminService.deleteThisWeekShiftUrl($scope.deleteShiftId).then(function(response) {
                $('#loadergif').hide();
                if(response.data) {
                  $scope.getThisWeekShifts();
                  $scope.shiftDeleted = true;
                }
                
            });
            $("#deleteShiftModal").modal('hide');
          }else {
            $scope.shiftDeleted = false;     
          }
    }
    $scope.getLiveChartByProduct = function(item,e) {
        localStorageService.set("product_name",item);
        $scope.activeMenu = item;
        //$("#reports, #duration").slideDown();
    }
}]);
   