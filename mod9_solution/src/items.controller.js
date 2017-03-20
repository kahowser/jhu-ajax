(function () {
  'use strict';

  angular.module('MenuApp')
  .controller('ItemsController', ItemsController);

  ItemsController.$inject = ['data'];
  function ItemsController(data) {
    var itemsView = this;

    // Retrieve the menu items from the response data
    itemsView.items = data.menu_items;
    // Retrieve the catagory's full name from the response data
    itemsView.categoryName = data.category.name;
    // Retrieve the category's specical instructions
    itemsView.categoryInstructions = data.category.special_instructions;

    console.log("Retrieved " + itemsView.items.length + " items for the " + itemsView.categoryName + " category." )
  }

})();
