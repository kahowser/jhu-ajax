(function () {
  'use strict';

  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {

    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/');

    // *** Set up UI states ***
    $stateProvider

    // Home page
    .state('home', {
      url: '/',
      templateUrl: 'src/templates/home.template.html'
    })

    // Categories page
    .state('categories', {
      url: '/categories',
      templateUrl: 'src/templates/categories_view.template.html',
      controller: 'CategoriesController as categoriesView',
      resolve: {
        categories: ['MenuDataService', function (MenuDataService) {
          return MenuDataService.getAllCategories();
        }]
      }
    })

    // Items page
    .state('items', {
      url: '/items/{categoryShortName}',
      templateUrl: 'src/templates/items_view.template.html',
      controller: 'ItemsController as itemsView',
      resolve: {
        data: ['MenuDataService', '$stateParams', function (MenuDataService, $stateParams) {
  				return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
        }]
      }
    });

  }

})();
