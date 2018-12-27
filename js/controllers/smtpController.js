lupaApp.controller('smtpController', ['$scope','lupaAdminService','smtpData',
function($scope,lupaAdminService,smtpData){
    $scope.error ="";
    $scope.successMsg ="";


    $scope.smtpObj = {
        mail_driver : '',
        host : '',
        port : '',
        email : '',
        password : '',
        encryption_type : ''
    };
    $scope.$watch('smtpObj', function (n, o) {
        if (n !== o){
            smtpData.set(n.mail_driver,n.host,n.port,n.email,n.password,n.encryption_type);
        };
    }, true);
    /**
     * Get existing SMTP details
     */
    $scope.getSmtpExistingDetails = function(){
        $('#loadergif').show();
        lupaAdminService.getSmtpExistingDetails().then(function(response) {
          //console.log(response.data,"register user");
          $scope.response = JSON.parse(response.data.status_response);
          $('#loadergif').hide();
          if(typeof $scope.response!=="undefined"){
            if($scope.response.success){
              $scope.error ="";
              $scope.smtpObj = $scope.response.data;
            }else{
              $scope.errorDeptlist = $scope.response.message;
            }
          }
        });
      };
      $scope.getSmtpExistingDetails();

    /**
     * Update smtp details
     */
      $scope.updateSmtpDetails = function(){
        $scope.error = "";
        $('#loadergif').show();
        lupaAdminService.updateSmtpDetails().then(function(response) {
          $('#loadergif').hide();
          $scope.response = JSON.parse(response.data.status_response);
          if(typeof $scope.response!=="undefined"){
            if($scope.response.success){
              $scope.error ="";
              $scope.successMsg = $scope.response.message;
              $scope.getSmtpExistingDetails();
            }else{
              $scope.error = $scope.response.message;
              $scope.successMsg ="";
            }
            
          }
        });
      };
}]);
   