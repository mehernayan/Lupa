lupaApp.directive('file', function () {
    return {
        scope: {
            file: '='
        },
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                var file = event.target.files[0];
                scope.file = file ? file : undefined;
                scope.$apply();
            });
        }
    };
});
lupaApp.controller('userValidateController', ['$scope','$http','lupaLicenceService','$location','localStorageService','$window','appConstants',
  function($scope,$http,lupaLicenceService,$location,localStorageService,$window,appConstants) {
    $scope.errorLicence ="";
  /**
     * Fetch user and dept list
     */
    
    $scope.getLicences = function(){
        $scope.errorLicence ="";
        $('#loadergif').show();
        lupaLicenceService.fetchLicences().then(function(response) {
        $('#loadergif').hide();
        $scope.response = response.data;
        if(typeof $scope.response!=="undefined"){
          if(!$scope.response.expired){
            $scope.errorLicence ="";
            localStorageService.set("licence_days",$scope.response.days_remaining);
            $location.path('/user');
          }else{
            $scope.errorLicence = $scope.response.message;
          }
        }
      });
    };
  //$scope.getLicences();

  /**
     * Generate key
     */
    
    $scope.getKey = function(){
        $window.open('http://kaizenat.com/LUPA/keyfile');
        
    };
    /**
     * Validate licence key
     */
    
    $scope.licenceValidate = function(){
        $('#loadergif').show();
        
        $http({
            method: 'POST',
            url: appConstants.serviceAddress + '/uploadlicense',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: $scope.file,
            transformRequest: function (data, headersGetter) {
                var formData = new FormData();
                angular.forEach(data, function (value, key) {
                    formData.append(key, value);
                });

                var headers = headersGetter();
                delete headers['Content-Type'];
    
                return formData;
            }
        }).then(function(response) {
            $('#loadergif').hide();
            $scope.response = response.data;
            if(typeof $scope.response!=="undefined"){
                if(!$scope.response.success){
                    $scope.errorLicence ="";
                    $location.path('/user');
                  }else{
                    $scope.errorLicence = $scope.response.message;
                  }
            }
        });
    }

}]);