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
      // Check to make sure the quantity is a number
      if (!angular.isNumber(toBuy[itemIndex].quantity)) {
        // Not a number add an error message
        toBuy[itemIndex].errorMessage="The quantity must be a number!";
      } else if (!Number.isInteger(toBuy[itemIndex].quantity)) {
        // Not a positive quantity
        toBuy[itemIndex].errorMessage="You can't buy part of an item. Quantity must be a whole number!";
      } else if (toBuy[itemIndex].quantity < 1) {
        // Not a positive quantity
        toBuy[itemIndex].errorMessage="The quantity must be at least 1!";
      } else {
        // Validation passed, clear error message
        toBuy[itemIndex].errorMessage="";
        // Remove item from toBuy list and put on bought list
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
