(function () {
  "use strict";

  angular.module('public')
  .directive('validateDish', ValidateDish);

  ValidateDish.$inject = ['MenuService', 'InfoService'];
  function ValidateDish(MenuService, InfoService) {
    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
        elm.on('blur', function() {
          // Reset validation errors
          ctrl.$setValidity("exists", null);
          // Only validate if a value was entered
          if (!ctrl.$isEmpty(ctrl.$modelValue)) {
            console.log("Searching for menu item: " + ctrl.$modelValue);
            var responsePromise = MenuService.getMenuItem(ctrl.$modelValue);
            responsePromise.then(function (response) {
              // Save off the validated dish
              InfoService.saveValidatedDish(response.data);
              ctrl.$setValidity("exists", true);
              console.log("Found your favorite dish: " + response.data.name);
            }).catch(function (errorResponse) {
              ctrl.$setValidity("exists", false);
              // Clear out the validated dish
              InfoService.clearValidatedDish();
              console.log("We could not find your favorite dish: " + ctrl.$modelValue);
              console.log("Error Code: " + errorResponse.status + " - " + errorResponse.statusText);
            });
          }
        });
      }
    };
  }

})();
