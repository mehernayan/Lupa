lupaApp.controller('smtpController', ['$scope','$location','lupaAdminService','smtpData','smtpTestData','localStorageService',
function($scope,$location,lupaAdminService,smtpData,smtpTestData,localStorageService){
  var userId = localStorageService.get("user");
  if(typeof userId ==="undefined" || userId == null) {
      $location.path('/');
  }

    $scope.error ="";
    $scope.successMsg ="";

    $scope.reportSidebar = true;
    $scope.favouriteActive = false;
    $scope.dashboardActive = false;
    
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

      /**
       * Test mail
       */

    $scope.smtpTest = {
        email : ''
    };
    $scope.$watch('smtpTest', function (n, o) {
        if (n !== o){
            smtpTestData.set(n.email);
        };
    }, true);

    /**
     * Update smtp details
     */
    $scope.testSmtpMail = function(){
        $scope.error = "";
        $('#loadergif').show();
        lupaAdminService.testSmtpMail().then(function(response) {
          $('#loadergif').hide();
          $scope.response = JSON.parse(response.data.status_response);
          if(typeof $scope.response!=="undefined"){
            if($scope.response.success){
              $scope.error ="";
              $scope.successMsg = $scope.response.message;
            }else{
              $scope.error = $scope.response.message;
              $scope.successMsg ="";
            }
           }
        });
      };
      $scope.getLiveChartByProduct = function(item,e) {
        localStorageService.set("product_name",item);
        $scope.activeMenu = item;
        //$("#reports, #duration").slideDown();
    }
}]);
   