lupaApp.controller('costCalculatorController', ['$scope','$filter','$location','lupaAdminService','purchaseData','localStorageService',
function($scope,$filter,$location,lupaAdminService,purchaseData,localStorageService){
    var userId = localStorageService.get("user");
    if(typeof userId ==="undefined" || userId == null) {
      $location.path('/');
    }

    $scope.error ="";
    $scope.successMsg ="";

    $scope.purchases = [];
    $scope.products = [];
    $scope.errorPurchaselist ="";
    $scope.errorProductlist ="";


    $scope.purchaseObj = {
        software_name : '',
        year_of_purchase : new Date(),
        license_type : '',
        lease_months : 0,
        licenses_purchased : 0,
        purchase_cost : 0
    };
    $scope.$watch('purchaseObj', function (n, o) {
        if (n !== o){
            purchaseData.set(n.software_name,n.year_of_purchase,n.license_type,n.lease_months,n.licenses_purchased,n.purchase_cost);
        };
    }, true);
    /**
     * Fetch Product list 
     */
    $scope.getProductList = function(){
        $('#loadergif').show();
        lupaAdminService.getProductList().then(function(response) {
          //console.log(response.data,"register user");
          $scope.response = response.data;
          $('#loadergif').hide();
          if(typeof $scope.response!=="undefined"){
            if($scope.response.success){
              $scope.errorProductlist ="";
              $scope.products = $scope.response.data;
            }else{
              $scope.errorProductlist = $scope.response.message;
            }
          }
        });
      };
      $scope.getProductList();

    /**
     * Fetch Purchase list 
     */
    $scope.getPurchaseList = function(){
        $('#loadergif').show();
        lupaAdminService.getPurchaseList().then(function(response) {
          //console.log(response.data,"register user");
          $scope.response = JSON.parse(response.data.status_response);
          $('#loadergif').hide();
          if(typeof $scope.response!=="undefined"){
            if($scope.response.success){
              $scope.errorPurchaselist ="";
              $scope.purchases = $scope.response.data;
            }else{
              $scope.errorPurchaselist = $scope.response.message;
            }
          }
        });
      };
      $scope.getPurchaseList();

      /**
     * Update purchase details
     */
    $scope.updatePurchaseDetails = function(){
        $scope.error = "";
        $('#loadergif').show();
        lupaAdminService.updatePurchaseDetails().then(function(response) {
          $('#loadergif').hide();
          $scope.response = JSON.parse(response.data.status_response);
          if(typeof $scope.response!=="undefined"){
            if($scope.response.success){
              $scope.error ="";
              $scope.successMsg = $scope.response.message;
              $scope.getPurchaseList();
            }else{
              $scope.error = $scope.response.message;
              $scope.successMsg ="";
            }
            
          }
        });
      };

      /**
       * Delete purchase 
       */
    $scope.deletePurchase = function(id){
        $('#loadergif').show();
        lupaAdminService.deletePurchase(id).then(function(response) {
          //console.log(response.data,"register user");
          $scope.response = JSON.parse(response.data.status_response);
          $('#loadergif').hide();
          if(typeof $scope.response!=="undefined"){
            if($scope.response.success){
              $scope.error ="";
              $scope.successMsg = $scope.response.message;
              $scope.getPurchaseList();
            }else{
              $scope.successMsg = "";
              $scope.error = $scope.response.message;
            }
          }
        });
      };
}]);
   