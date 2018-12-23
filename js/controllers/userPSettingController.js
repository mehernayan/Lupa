lupaApp.controller('userPSettingController',['$scope','lupaUserService','profileSettingData','localStorageService',
 function($scope,lupaUserService,profileSettingData,localStorageService) {
      
      $scope.userLogged = localStorageService.get("user");
      
      $scope.profileData = {
        id : '',
        email : '',
        npassword : '',
        ncpassword : ''
      };
      $scope.$watch('profileData', function (n, o) {
        if (n !== o){
            profileSettingData.set(n.id,n.email,n.npassword,n.ncpassword);
        };
      }, true);
      /* set id */
      if($scope.userLogged !== null){
        $scope.profileData.id = $scope.userLogged[0].id;
      }
      $scope.emptyReqFields = function(){
        $scope.profileData = {
            id : $scope.userLogged.id,
            email : '',
            npassword : '',
            ncpassword : ''
        };
      };

      /**
       * Get existing user profile details
       */
      $scope.fetchProfileSettings = function(){
        lupaUserService.fetchUserProfileSettings().then(function(response) {
        $scope.response = JSON.parse(response.data.status_response);
        if(typeof $scope.response!=="undefined"){
            if($scope.response.success){
                console.log($scope.response);
                $scope.profileData.email = $scope.response.data[1].email;
            }else{
                $scope.error = "Error in fetching user data";
            }
        }
        });
      };
      $scope.fetchProfileSettings();
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
        }
        });
      };
}]);
   