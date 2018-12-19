lupaApp.controller("dashboardController",function($scope, $timeout) {
    $scope.expandNav = false;
         $scope.collapseNav = true;
         
         $scope.navToggle = function() {
             if($scope.expandNav) {
                 $scope.expandNav = false;
                 $scope.collapseNav = true;
             }
             else {
                 $scope.expandNav = true;
                 $scope.collapseNav = false;
             }
             
             
             
         }

         $timeout(function() {
             
             $("#product li").on("click", function(event) {
                 event.stopPropagation();
             })
         }, 2000);
});