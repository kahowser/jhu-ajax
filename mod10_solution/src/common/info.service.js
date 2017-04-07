(function () {
"use strict";

angular.module('common')
.service('InfoService', InfoService);

function InfoService() {
  var service = this;

  service.saveMyInfo = function (user) {
    console.log("Saving info...");
    service.myInfo = user;
  };

  service.getMyInfo = function () {
    console.log("Retrieving info...");
    console.log(service.myInfo);
    return service.myInfo;
  }
}

})();
