(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['InfoService', 'MenuService'];
function SignUpController(InfoService, MenuService) {
  var $ctrl = this;

  $ctrl.signup = function(user) {
    $ctrl.noMatchingItem = false;
    var responsePromise = MenuService.getMenuItem(user.favoriteDishName);

    responsePromise.then(function (response) {
      user.favoriteDish = response.data;
      console.log("Found your favorite dish: " + user.favoriteDishName);
      InfoService.saveMyInfo(user);
      $ctrl.saved = true;
      console.log("Your info has been saved.");
    })
    .catch(function (errorResponse) {
      console.log("We could not find your favorite dish: " + user.favoriteDishName);
      console.log("Error Code: " + errorResponse.status + " - " + errorResponse.statusText);
      $ctrl.noMatchingItem = true;
    });
  };
}

})();
