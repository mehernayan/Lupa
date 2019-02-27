lupaApp.factory('fileService',function(){
    var fileService = this;
    fileService.files =  [];
    //console.log(fileService.files);
    return fileService;
});
lupaApp.directive('ngFiles', ['$parse','fileService', function ($parse,fileService) {
    function fn_link(scope, element) {
        //var onChange = $parse(attrs.ngFiles);
        element.on('change', function (event) {
            //onChange(scope, { $files: event.target.files });
            scope.$apply(function(){
                if(element[0].files != undefined){
                    for(var i=0;i<element[0].files.length;i++){
                        fileService.files.push(element[0].files[i]);
                    }
                }
            })
        });
    };
    return {
        restrict : 'A',
        link: fn_link
    }
}]);
lupaApp.controller('userValidateController', ['$scope','$http','lupaLicenceService','$location','localStorageService','$window','appConstants','fileService',
  function($scope,$http,lupaLicenceService,$location,localStorageService,$window,appConstants,fileService) {
    $scope.errorLicence ="";
    localStorageService.clearAll();
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
  $scope.getLicences();

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
        var formdata = new FormData();
        var files = fileService.files;
        angular.forEach(files,function(value,key){
            formdata.append(key,value);
            console.log(formdata);
        });
        
        $('#loadergif').show();
        if(document.getElementById("file1").value != ""){
            $http({
                method: 'POST',
                url: appConstants.serviceAddress + '/uploadlicense',
                headers: {
                    'Content-Type': undefined
                },
                data:formdata
            }).then(function(response) {
                $('#loadergif').hide();
                $scope.response = response.data;
                if(typeof $scope.response!=="undefined"){
                    if($scope.response.success){
                        $scope.errorLicence ="";
                        $scope.getLicences();
                    }else{
                        $scope.errorLicence = $scope.response.message;
                    }
                }
            });
        }else{
            $scope.errorLicence = "Please choose a file";
            $('#loadergif').hide();
        }
    }

}]);