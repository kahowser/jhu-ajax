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
      {name: 'pint(s) of ice cream', quantity: 5},
      {name: 'banana(s)', quantity: 3},
      {name: 'jar(s) of hot fudge sauce', quantity: 2},
      {name: 'container(s) of rainbow sprinkles', quantity: 1},
      {name: 'bag(s) of pecans', quantity: 1}
    ];

    //List of items bought
    var bought = [];

    /*
      Remove the item specified from the toBuy list. This will result in an array
      containing the items removed. Since we are only removing one item, the
      array will only ever contain one item so grab that item, at index 0, and
      add it to the bought list.
    */
    service.buyItem = function (itemIdex) {
      bought.push(toBuy.splice(itemIdex, 1)[0]);
    };

    service.getToBuyItems = function () {
      return toBuy;
    };

    service.getBoughtItems = function () {
      return bought;
    };
  }

})();
