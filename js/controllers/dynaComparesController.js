lupaApp.controller('dynaComparesController', ['$scope','lupaManagerService','dynaCompData','dynaFeatureData',
function($scope,lupaManagerService,dynaCompData,dynaFeatureData){
    $scope.error = "";
    $scope.successMsg = "";
    $scope.errorProductsList ="";
    $scope.prodFeatures = [];


    /** 
       * Fetch Dyna Product list
       */
      $scope.getDynaProductList = function(){
        $('#loadergif').show();
        lupaManagerService.fetchDynaProductList().then(function(response) {
          $scope.response = JSON.parse(response.data.status_response);
          $('#loadergif').hide();
          if(typeof $scope.response!=="undefined"){
            if($scope.response.success){
              $scope.errorProductsList ="";
              $scope.productsList =$scope.response.products_list;
            }else{
              $scope.errorProductsList = $scope.response.message;
            }
          }
        });
      };
      $scope.getDynaProductList();

      /** Dyna Compare Object */
        $scope.dynaObj = {
            product_name : ''
        };
        $scope.$watch('dynaObj', function (n, o) {
            if (n !== o){
            dynaCompData.set(n.product_name);
            $scope.getFeaturesList();
            };
        }, true);
        
        /**
         * Get feature list
         */
        $scope.getFeaturesList = function(){
            $scope.error = "";
            $scope.successMsg ="";
            $('#loadergif').show();
            lupaManagerService.getFeaturesList().then(function(response) {
              $('#loadergif').hide();
              $scope.response = response.data;
              if(typeof $scope.response!=="undefined"){
                if($scope.response.success){
                    $scope.error ="";
                    $scope.prodFeatures = $scope.response.data;
                }else{
                    $scope.error = $scope.response.message;
                }
              }
            });
          };

      /** Dyna Compare Object */
      $scope.features_lists = [];
      $scope.$watch('features_lists', function (n, o) {
          if (n !== o){
            dynaFeatureData.set(n);
          };
      }, true);
      
      /**
       * Add features to list
       */
      $scope.addFeatures = function(){
         $scope.features_lists = [];
         if(typeof $scope.prodFeatures !=="undefined" && $scope.prodFeatures.length !==0 ){
            $scope.prodFeatures.forEach(element => {
                if(typeof element.status!=="undefined" && element.status){
                  $scope.features_lists.push(element.feature_name);
                }
            });
         }
      };

      /**
       * Get feature list
       */
      $scope.postFeaturesList = function(){
          $scope.error = "";
          $scope.successMsg ="";
          $('#loadergif').show();
          lupaManagerService.postFeaturesList().then(function(response) {
            $('#loadergif').hide();
            $scope.response = JSON.parse(response.data.status_response);
            if(typeof $scope.response!=="undefined"){
              if($scope.response.success){
                  $scope.error ="";
                  $scope.successMsg =$scope.response.message;
              }else{
                  $scope.successMsg ="";
                  $scope.error = $scope.response.message;
              }
            }
          });
        };
}]);
   