(function() {
	'use strict';

	angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
	.directive('foundItems', FoundItemsDirective)
	.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/menu_items.json");

	function FoundItemsDirective() {
		var ddo = {
			templateUrl: 'template/items.template.html',
			scope: {
				found: '<',
				onRemove: '&'
			}
		};

		return ddo;
	}

	/*
		The controller should call the getMatchedMenuItems method when appropriate
		and store the result in a property called found attached to the controller
		instance.
	*/
	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService) {
		var search = this;

		search.searchTerm = "";
		// Don't initailize search.found, this will keep the Nothing found message from appearing on page load
		search.found;

		search.narrowItDown = function() {
			if(search.searchTerm != "") {
				console.log("Searching for: " + search.searchTerm);
				var promise = MenuSearchService.getMatchedMenuItems(search.searchTerm);
				promise.then(function (itemsFoundArray) {
					search.found = itemsFoundArray;
					console.log("Found " + search.found.length + " matching items.");
				}).catch(function(error) {
					search.found = [];
					console.log(error);
				})
			} else {
				search.found = [];
			}

		};


		search.remove = function(index) {
			var removed = search.found.splice(index, 1);
			console.log("Removed: " + removed[0].name);
		};
  }

	MenuSearchService.$inject = ['$http', 'ApiBasePath']
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    /*
      That method will be responsible for reaching out to the server
			(using the $http service) to retrieve the list of all the menu items.
			Once it gets all the menu items, it should loop through them to pick out
			the ones whose description matches the searchTerm. Once a list of found
			items is compiled, it should return that list (wrapped in a promise).
    */
    service.getMatchedMenuItems = function (searchTerm) {
			return $http({
        method: "GET",
        url: (ApiBasePath)
      }).then(function (result) {
				var foundItems = [];
				var allMenuItems = result.data.menu_items;

				console.log("Retrieved " + allMenuItems.length + " menu items from the service.");

				// process result and only keep items that match
				for(var index in allMenuItems) {
					var item = allMenuItems[index];
					if(item.description.toLowerCase().includes(searchTerm.toLowerCase())) {
						foundItems.push(item);
					}
				}

		    // return processed items
		    return foundItems;
			});
    };
  }

})();
