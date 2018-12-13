  lupaApp.controller('userForgotPasswordController', function($scope) {
   
    $scope.confirmOTP = true;

    $scope.getCodeBoxElement = function(index) {
            return document.getElementById('codeBox' + index);
          }
          $scope.onKeyUpEvent = function(index, event) {
            const eventCode = event.which || event.keyCode;
            if ($scope.getCodeBoxElement(index).value.length === 1) {
              if (index !== 4) {
                $scope.getCodeBoxElement(index+ 1).focus();
              } else {
                $scope.getCodeBoxElement(index).blur();
                $scope.confirmOTP = false;
                
                
              }
            }
            if (eventCode === 8 && index !== 1) {
              getCodeBoxElement(index - 1).focus();
            }
          }
          $scope.onFocusEvent = function(index) {
            for (item = 1; item < index; item++) {
              const currentElement = getCodeBoxElement(item);
              if (!currentElement.value) {
                  currentElement.focus();
                  break;
              }
            }
          } 

  });
