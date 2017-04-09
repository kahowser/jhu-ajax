(function () {
"use strict";

angular.module('common')
.service('InfoService', InfoService);

function InfoService() {
  var service = this;

  // Methods for keeping track of the validated favorite dish

  service.saveValidatedDish = function (validatedDish) {
    console.log("Keeping track of validated dish: " + validatedDish.name);
    service.validatedDish = validatedDish
  };

  service.clearValidatedDish = function () {
    console.log("Clearing validated dish.");
    service.validatedDish = null;
  };

  service.getValidatedDish = function () {
    console.log("Retrieving validated dish.");
    return service.validatedDish;
  };

  // Methods for saving and retireving the user's information

  service.saveMyInfo = function (user) {
    console.log("Saving info...");
    service.myInfo = user;
    return true;
  };

  service.getMyInfo = function () {
    console.log("Retrieving info...");
    console.log(service.myInfo);
    return service.myInfo;
  };
}

})();
