var lupaLicenceService = angular.module('lupaLicenceProvider', []);
lupaLicenceService.service('lupaLicenceService', ['$http', '$q','localStorageService','appConstants',
    function ($http, $q, localStorageService,appConstants) {

       /*
		 * fetch the licence list
		 */
        this.fetchLicences = function() {
            var deferred = $q.defer();
            $http({
                method : 'GET',
                url : appConstants.serviceAddress+'/'
            }).then(function(response) {
                deferred.resolve(response);
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

         /*
        * Post key to server
        */

       this.validateKey = function () {
        var deferred = $q.defer();
        if (typeof file !== "undefined") {
            $http({
                method: 'POST',
                url: appConstants.serviceAddress + '/uploadlicense',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: file,
                transformRequest: function (data, headersGetter) {
                    var formData = new FormData();
                    angular.forEach(data, function (value, key) {
                        formData.append(key, value);
                    });
    
                    var headers = headersGetter();
                    delete headers['Content-Type'];
    
                    return formData;
                }
            }).then(function (response) {
                deferred.resolve(response);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }
    };
}]);