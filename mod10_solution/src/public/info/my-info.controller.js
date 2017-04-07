(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['myInfo'];
function MyInfoController(myInfo) {
  var $ctrl = this;
  $ctrl.myInfo = myInfo;
}

})();
