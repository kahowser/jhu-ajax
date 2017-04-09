describe("Sign-Up Controller Tests", function() {

  beforeEach(module('public'));

  var $controller;
  var $compile;
  var signUpController;
  var user;
  var item = {
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
  };

  beforeEach(inject(function (_$controller_, _$compile_) {
    $controller = _$controller_;
    $compile = _$compile_;

    // Recreate the user everytime so we start fresh
    user = {
      firstName: 'Kathryn',
      lastName: 'Howser',
      emailAddress: 'username@domain.com',
      phoneNumber: '123-123-1234',
      favoriteDishName: 'A1'
    };

    // In order to dynamically set the value returned by the getValidatedDish method of the mocked InfoService, create a function rather than a controller object.
    createController = function(item) {
        var InfoServiceMock = {};
        InfoServiceMock.getValidatedDish = function () {
          return item;
        };
        InfoServiceMock.saveMyInfo = function (user) {
          return true;
        };

        signUpController = $controller('SignUpController', {InfoService: InfoServiceMock});

        signUpController.signUpForm = {
          $valid: true,
          $setPristine: function() {},
          $setUntouched: function() {}
        };

        spyOn(signUpController.signUpForm, '$setPristine');
        spyOn(signUpController.signUpForm, '$setUntouched');

        return signUpController;
    };

  }));

  it("When InfoService.getValidatedDish() returns an item, the controller should set the user's favorite dish and change saved value", function() {
    var signUpController = createController(item);
    signUpController.signup(user);
    expect(user.favoriteDish).toBe(item);
    expect(signUpController.saved).toBe(true);
    expect(signUpController.signUpForm.$setPristine).toHaveBeenCalled();
    expect(signUpController.signUpForm.$setUntouched).toHaveBeenCalled();
  });

  it("When InfoService.getValidatedDish() returns null, nothing should happen in controller", function() {
    var signUpController = createController(null);
    signUpController.signup(user);
    expect(user.favoriteDish).toBe(undefined);
    expect(signUpController.saved).toBe(undefined);
    expect(signUpController.signUpForm.$setPristine).callCount=0;
    expect(signUpController.signUpForm.$setUntouched).callCount=0;
  });

});
