(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['InfoService'];
function SignUpController(InfoService) {
  var $ctrl = this;

  $ctrl.signup = function(user) {
    // Retrieve the validated dish
    var validatedDish = InfoService.getValidatedDish();

    if(validatedDish != null) {
      // Set the user's favorite dish to the one we validated
      user.favoriteDish = validatedDish;
      // Save the user's info
      $ctrl.saved = InfoService.saveMyInfo(user);
      if($ctrl.saved) {
        console.log("Your info has been saved.");
        // Set back to pristine.
        $ctrl.signUpForm.$setPristine();
        // Set back to untouched state.
        $ctrl.signUpForm.$setUntouched();
      }
    } else {
      // Should never get here, can't signup if favorite dish is empty
      console.log("You must select a favorite dish.");
    }
  };

}

})();
