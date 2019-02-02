lupaApp.controller('userValidateController', ['$scope','lupaUserService','$location',
  function($scope,lupaUserService,$location) {
  $scope.userValidate = function(){
    $location.path('/user');
  }

}]);