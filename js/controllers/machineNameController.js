lupaApp.controller('machineNameController', ['$scope', 'userData', 'lupaAdminDashboardService', '$location', 'localStorageService', function($scope, userData, lupaAdminDashboardService, $location, localStorageService) {
    var userId = localStorageService.get("user");
    if (typeof userId === "undefined" || userId == null) {
        $location.path('/');
    }
    $scope.machinesObj = {};
    $scope.machineNames = function() {
        $('#loadergif').show();
        lupaAdminDashboardService.getMachineNames().then(function(response) {
            $('#loadergif').hide();
            $scope.response = JSON.parse(response.data.status_response);
            $scope.response = $scope.response.data;
            if($scope.response.length) {
                for(i=0;i<$scope.response.length;i++) {
                    $scope.machinesObj[$scope.response[i].product_name] = $scope.response[i].machine_name;
                }
            }
            
        });
    }
    $scope.machineNames();
    
    $scope.updateMachineNames = function() {
            $('#loadergif').show();
            lupaAdminDashboardService.updateMachineNames($scope.machinesObj).then(function(response) {
                $('#loadergif').hide();
                $scope.successMachine = JSON.parse(response.data.status_response);
                setTimeout(function() {
                    $('.machineSuccess').hide();
                }, 6000);
                
            })
    }



}]);