(function () {
  'use strict';

  angular.module('MenuApp')
  .controller('ItemsController', ItemsController);

  ItemsController.$inject = ['items', 'categoryName', '$stateParams'];
  function ItemsController(items, $stateParams) {
    var itemsView = this;
    itemsView.items = items;
    itemsView.categoryName = categoryName;
    //itemsView.categoryName = $stateParams.categoryName;
    console.log("Retrieved " + itemsView.items.length + " items for the " + itemsView.categoryName + " category." )
  }

})();
