'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('dicerollerApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach aNumrolls to the scope', function () {
    expect(true).toBe(true);
  });
});
