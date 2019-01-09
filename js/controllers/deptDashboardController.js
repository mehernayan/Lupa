lupaApp.controller('userDashboardController', ['$scope', 'userData', 'lupaUserDashboardService', '$location', 'localStorageService', function ($scope, userData, lupaUserDashboardService, $location, localStorageService) {
    $scope.productlist = localStorageService.get('productlist');
    $scope.reportSidebar = true;
    $scope.dashboardActive = true; 
    
}]);