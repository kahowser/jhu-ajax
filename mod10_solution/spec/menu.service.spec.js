describe('Menu Service Tests', function () {

  var menuService;
  var $httpBackend;
  var ApiPath;

  beforeEach(function () {
    module('common');

    inject(function ($injector) {
      menuService = $injector.get('MenuService');
      $httpBackend = $injector.get('$httpBackend');
      ApiPath = $injector.get('ApiPath');
    });
  });

  it('Search for menu item with short name: A1 should return the menu item object', function() {
    $httpBackend.whenGET(ApiPath + '/menu_items/A1.json').respond({
      "id":1,
      "short_name":"A1",
      "name":"Won Ton Soup with Chicken",
      "description":"chicken-stuffed won tons in clear chicken broth with white meat chicken pieces and a few scallions",
      "price_small":2.55,
      "price_large":5.0,
      "small_portion_name":"pint",
      "large_portion_name":"quart",
      "created_at":"2017-03-25T02:37:58.256Z",
      "updated_at":"2017-03-25T02:37:58.256Z",
      "category_short_name":"A",
      "image_present":true
    });

    $httpBackend.expectGET(ApiPath + '/menu_items/A1.json');

    menuService.getMenuItem('A1').then(function(response) {
      expect(response.data).toEqual({
        "id":1,
        "short_name":"A1",
        "name":"Won Ton Soup with Chicken",
        "description":"chicken-stuffed won tons in clear chicken broth with white meat chicken pieces and a few scallions",
        "price_small":2.55,
        "price_large":5.0,
        "small_portion_name":"pint",
        "large_portion_name":"quart",
        "created_at":"2017-03-25T02:37:58.256Z",
        "updated_at":"2017-03-25T02:37:58.256Z",
        "category_short_name":"A",
        "image_present":true
      });
    });

    $httpBackend.flush();
  });

  it('Search for menu item with short name: a1 should return the menu item object', function() {
    $httpBackend.whenGET(ApiPath + '/menu_items/A1.json').respond({
      "id":1,
      "short_name":"A1",
      "name":"Won Ton Soup with Chicken",
      "description":"chicken-stuffed won tons in clear chicken broth with white meat chicken pieces and a few scallions",
      "price_small":2.55,
      "price_large":5.0,
      "small_portion_name":"pint",
      "large_portion_name":"quart",
      "created_at":"2017-03-25T02:37:58.256Z",
      "updated_at":"2017-03-25T02:37:58.256Z",
      "category_short_name":"A",
      "image_present":true
    });

    $httpBackend.expectGET(ApiPath + '/menu_items/A1.json');

    menuService.getMenuItem('a1').then(function(response) {
      expect(response.data).toEqual({
        "id":1,
        "short_name":"A1",
        "name":"Won Ton Soup with Chicken",
        "description":"chicken-stuffed won tons in clear chicken broth with white meat chicken pieces and a few scallions",
        "price_small":2.55,
        "price_large":5.0,
        "small_portion_name":"pint",
        "large_portion_name":"quart",
        "created_at":"2017-03-25T02:37:58.256Z",
        "updated_at":"2017-03-25T02:37:58.256Z",
        "category_short_name":"A",
        "image_present":true
      });
    });

    $httpBackend.flush();
  });

  it('Search for menu item with short name: a123 should return an internal server error', function() {
    $httpBackend.whenGET(ApiPath + '/menu_items/A123.json').respond({"status":"500","error":"Internal Server Error"});

    $httpBackend.expectGET(ApiPath + '/menu_items/A123.json');

    menuService.getMenuItem('a123').then(function(response) {
      expect(response.data).toEqual({"status":"500","error":"Internal Server Error"});
    });

    $httpBackend.flush();
  });

});
