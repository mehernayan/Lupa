lupaApp.controller('deptSettingController', function($scope) {
    $scope.tab = 3;
    $scope.setTab = function (tabId) {
        $scope.tab = tabId;
    };
    $scope.isSet = function (tabId) {
        return $scope.tab === tabId;
    };
});
   