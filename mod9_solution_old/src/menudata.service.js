(function() {
	'use strict';

	angular.module('data')
  .service('MenuDataService', MenuDataService);

  MenuDataService.$inject = ['$http', 'ApiBasePath']
  function MenuDataService($http, ApiBasePath) {
    var service = this;

    /*
      This method should return a promise which is a result of using the
      $http service, using the following REST API endpoint:
      https://davids-restaurant.herokuapp.com/categories.json
    */
    service.getAllCategories = function() {
      //console.log("About to call GET for https://davids-restaurant.herokuapp.com/categories.json");
			return $http({
        method: "GET",
        url: (ApiBasePath + "/categories.json")
      }).then(function (result) {
				var categories = result.data;
        return categories;
			});
    };

    /*
      This method should return a promise which is a result of using the
      $http service, using the following REST API endpoint:
      https://davids-restaurant.herokuapp.com/menu_items.json?category=,
      where, before the call to the server, your code should append whatever
      categoryShortName value was passed in as an argument into the
      getItemsForCategory method.
    */
    service.getItemsForCategory = function(categoryShortName) {
      return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json"),
        params: {
					category: categoryShortName
				}
      }).then(function (result) {
				return result.data;
			});
    };

  }

})();
