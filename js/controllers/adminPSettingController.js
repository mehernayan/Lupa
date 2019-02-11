lupaApp.controller('adminPSettingController',['$scope','$location','lupaAdminService','adminProfileSettingData','localStorageService',
 function($scope,$location,lupaAdminService,adminProfileSettingData,localStorageService) {
    $scope.profileData = {
        id : '',
        name : '',
        email : '',
        password : '',
        password_confirmation : ''
    };
    $scope.reportSidebar = true;
    $scope.favouriteActive = false;
    $scope.dashboardActive = false;

    /**
       * Get existing user profile details
       */
      $scope.fetchProfileSettings = function(){
        $('#loadergif').show();
        lupaAdminService.fetchUserProfileSettings().then(function(response) {
        $scope.response = JSON.parse(response.data.status_response);
        $('#loadergif').hide();
        if(typeof $scope.response!=="undefined"){
            if($scope.response.success){
                console.log($scope.response);
                $scope.profileData.email = $scope.response.data[0].email;
                $scope.profileData.name = $scope.response.data[0].name;
            }else{
                $scope.error = "Error in fetching user data";
            }
        }
        });
      };
    
      var userId = localStorageService.get("user");
      if(typeof userId ==="undefined" || userId == null) {
          $location.path('/');
      }else{
        $scope.userLogged = localStorageService.get("user")[0];
        /* set id */
        if($scope.userLogged !== null){
          $scope.profileData.id = $scope.userLogged.id;
        }
        $scope.fetchProfileSettings();
      }

    
      $scope.$watch('profileData', function (n, o) {
        if (n !== o){
            adminProfileSettingData.set(n.id,n.name,n.email,n.password,n.password_confirmation);
        };
      }, true);
      
      $scope.emptyReqFields = function(){
        $scope.profileData = {
            id : $scope.userLogged.id,
            name : '',
            email : '',
            password : '',
            password_confirmation : ''
        };
      };

      
      /**
       * update user profile details
       */

      $scope.updateProfileSettings = function(){
        $scope.error = "";
        $scope.successMsg = "";
        $('#loadergif').show();
        lupaAdminService.updateProfileSettings().then(function(response) {
        $('#loadergif').hide();
        $scope.response = JSON.parse(response.data.status_response);
        if(typeof $scope.response!=="undefined"){
            if($scope.response.success){
                $scope.error ="";
                $scope.successMsg = $scope.response.message;
                $scope.emptyReqFields();
            }else{
                $scope.successMsg = "";
                $scope.error = $scope.response.message;
            }
            $scope.fetchProfileSettings();
        }
        });
      };
      $scope.getLiveChartByProduct = function(item,e) {
        localStorageService.set("product_name",item);
        $scope.activeMenu = item;
        //$("#reports, #duration").slideDown();
        };
}]);
   
   