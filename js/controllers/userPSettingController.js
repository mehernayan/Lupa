lupaApp.controller('userPSettingController',['$scope','$location','lupaUserService','profileSettingData','localStorageService',
 function($scope,$location,lupaUserService,profileSettingData,localStorageService) {
        $scope.profileData = {
            id : '',
            email : '',
            npassword : '',
            ncpassword : ''
        };  
      /**
       * Get existing user profile details
       */
      $scope.fetchProfileSettings = function(){
        $('#loadergif').show();
        lupaUserService.fetchUserProfileSettings().then(function(response) {
        $scope.response = JSON.parse(response.data.status_response);
        $('#loadergif').hide();
        if(typeof $scope.response!=="undefined"){
            if($scope.response.success){
                $scope.profileData.email = $scope.response.data[0].email;
                $scope.profileData.id = $scope.response.data[0].id;
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
            profileSettingData.set(n.id,n.email,n.npassword,n.ncpassword);
        };
      }, true);
      
      $scope.emptyReqFields = function(){
        $scope.profileData = {
            id : $scope.userLogged.id,
            email : '',
            npassword : '',
            ncpassword : ''
        };
      };

      
      
      /**
       * update user profile details
       */

      $scope.updateProfileSettings = function(){
        $scope.error = "";
        $scope.successMsg = "";
        $('#loadergif').show();
        lupaUserService.updateProfileSettings().then(function(response) {
        $('#loadergif').hide();
        //console.log(response.data,"register user");
        $scope.response = JSON.parse(response.data.status_response);
        //console.log($scope.response,"is success");
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
}]);
   