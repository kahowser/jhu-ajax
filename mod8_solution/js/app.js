(function() {
	'use strict';

	angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
	.directive('foundItems', FoundItemsDirective)
	.filter('description', DescriptionFilterFactory)
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
		A filter factory function that will return a filter functions that takes
		an array and looks for a given word in each of it's obects' descriptions
	*/
	DescriptionFilterFactory.$inject = ['$filter'];
	function DescriptionFilterFactory($filter) {
    return function (items, searchTerm) {
			// lowercase the inputs
			items = $filter('lowercase')(items);
			searchTerm = $filter('lowercase')(searchTerm);
			// Apply the Array.prototype.filter() to filter the array to just the
			// items where the description includes the provided searchTerm string
			return items.filter(function (item) {
				return item.description.includes(searchTerm);
			});
    };
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
					console.log("ERROR: " + error);
				})
			} else {
				search.found = [];
				console.log("Search string was empty.");
			}

		};

		search.remove = function(index) {
			var removed = search.found.splice(index, 1);
			console.log("Removed: " + removed[0].name);
		};
  }

	MenuSearchService.$inject = ['$http', 'ApiBasePath', 'descriptionFilter']
  function MenuSearchService($http, ApiBasePath, descriptionFilter) {
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

				// Use the custom description filter to narrow down the array to just the items we want
				foundItems = descriptionFilter(result.data.menu_items, searchTerm);

		    // return processed items
		    return foundItems;
			});
    };
  }

})();
