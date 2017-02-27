(function() {
	'use strict';

	angular.module('LunchCheck', [])
	.controller('LunchCheckController', LunchCheckController);

	LunchCheckController.$inject = ['$scope'];

	function LunchCheckController($scope) {
		// Initialize Lunch Menu to an empty string
		$scope.lunchMenu = "";

		// Function to check the number of lunch items
		$scope.checkAmount = function() {
			// Initialize the messages to blank
			$scope.messages = {
				"errorMessages" : [],
				"successMessages" : []
			};

			/*
				Split the input on commas and then filter out the empty strings and
				return the length of the resulting array
			**/
			var menuLength = $scope.lunchMenu.split(',').filter(function (item) {
				return item.trim() != "";
			}).length;

			// Add a message depending on the length
			if (menuLength == 0 ) {
				// If the user did not enter any valid items, give an error
				$scope.messages.errorMessages.push("Please enter data first.");
			} else if(menuLength < 4) {
				// IF the user entered less than 4 valid items, tell them to enjoy
				$scope.messages.successMessages.push("Enjoy!");
			} else {
				// If the user entered more than 3 valid items, tell them it's too much
				$scope.messages.successMessages.push("Too Much!");
			}
		} //End of checkAmount function
  }; //End of the LunchCheckController
})();
