(function() {
	'use strict';

	angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var buylist = this;

    buylist.items = ShoppingListCheckOffService.getToBuyItems();

    buylist.removeItem = function(itemIndex) {
      ShoppingListCheckOffService.buyItem(itemIndex);
    };
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var boughtlist = this;

    boughtlist.items = ShoppingListCheckOffService.getBoughtItems();
  }

  function ShoppingListCheckOffService() {
    var service = this;

    //List of items to buy
    var toBuy = [
      {name: 'pint(s) of ice cream', quantity: 5, pricePerItem: 4, errorMessage: ""},
      {name: 'banana(s)', quantity: 3, pricePerItem: 1, errorMessage: ""},
      {name: 'jar(s) of hot fudge sauce', quantity: 2, pricePerItem: 2, errorMessage: ""},
      {name: 'container(s) of rainbow sprinkles', quantity: 1, pricePerItem: 2, errorMessage: ""},
      {name: 'bag(s) of pecans', quantity: 1, pricePerItem: 10, errorMessage: ""}
    ];

    //List of items bought
    var bought = [];

    /*
      Remove the item specified from the toBuy list. This will result in an array
      containing the items removed. Since we are only removing one item, the
      array will only ever contain one item so grab that item, at index 0, and
      add it to the bought list.

      Added validation logic to keep user from adding invalid quantities.
    */
    service.buyItem = function (itemIndex) {
      // Default Error Message to empty string
      toBuy[itemIndex].errorMessage="";

      // Save off the original quantity before we modify it
      var quantityString = toBuy[itemIndex].quantity;
      // Convert string to a number so we can validate it
      var quantity = Number(quantityString);
      // Save the generic error so we do not have to retype it.
      var genericError = "The quantity '" + quantityString + "' is invalid. ";

      // Check to make sure the quantity is valid
      if (isNaN(quantity)) {
        // Not a number add an error message
        toBuy[itemIndex].errorMessage = genericError + "It must be a number!";
      } else if (!Number.isInteger(quantity)) {
        // You can't buy part of an item
        toBuy[itemIndex].errorMessage = genericError + "It must be an integer!";
      } else if (quantity < 1) {
        // Not a positive quantity
        toBuy[itemIndex].errorMessage = genericError + "It must be at least 1!";
      } else {
        // Validation passed, remove item from toBuy list and put on bought list
        bought.push(toBuy.splice(itemIndex, 1)[0]);
      }
    };

    // Return the list of items on the toBuy list
    service.getToBuyItems = function () {
      return toBuy;
    };

    // Return the list of items on the bought list
    service.getBoughtItems = function () {
      return bought;
    };
  }

})();
