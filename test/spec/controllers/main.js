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

  it('should show no dice when armysize is empty', function () {
    var options = {
      'firepower'        : false, 
      'ambush'           : false, 
      'doublecasualties' : false, 
      'bunker'           : false, 
      'atkrad'           : false, 
      'dfndrad'          : false, 
    };

    // check attack dice
    for (var i=1; i < 5; i++) {
      expect(logic.aShowDie(i, parseInt("", 10), options)).toBe(false);
      expect(logic.aShowDie(i, parseInt(null, 10), options)).toBe(false);
      expect(logic.aShowDie(i, parseInt(undefined, 10), options)).toBe(false);
    }

    // check defend dice
    for (var i=1; i < 4; i++) {
      expect(logic.dShowDie(i, parseInt("", 10), options)).toBe(false);
      expect(logic.dShowDie(i, parseInt(null, 10), options)).toBe(false);
      expect(logic.dShowDie(i, parseInt(undefined, 10), options)).toBe(false);
    }
  });
  
  it('should show correct amount of dice for attacker', function () {
    var options = {
      'firepower'        : false,
      'ambush'		 : false,
      'doublecasualties' : false,
      'bunker'		 : false,
      'atkrad'		 : false,
      'dfndrad'		 : false,
    };

    var correctAnswers = function (dienum, armysize) {
      if (armysize <= 1) {
	return false;
      } else if (armysize === 2 && dienum >= 2) {
	return false;
      } else if (armysize === 3 && dienum >= 3) {
	return false;
      } else if (armysize >= 4 && dienum >= 4) {
	return false;
      } else {
	return true;
      }
    };

    for (var armysize=1; armysize < 10; armysize++) {
      for (var dienum=1; dienum < 5; dienum++) {
	expect(logic.aShowDie(dienum, armysize, options)).toEqual(correctAnswers(dienum, armysize));
      }
    }
  });

  it('should show correct amount of dice for attacker w/ firepower', function () {
    var options = {
      'firepower'        : true,
      'ambush'		 : false,
      'doublecasualties' : false,
      'bunker'		 : false,
      'atkrad'		 : false,
      'dfndrad'		 : false,
    };

    var correctAnswers = function (dienum, armysize) {
      if (armysize <= 1) {
	return false;
      } else if (armysize === 2 && dienum >= 3) {
	return false;
      } else if (armysize === 3 && dienum >= 4) {
	return false;
      } else if (armysize >= 4 && dienum >= 5) {
	return false;
      } else {
	return true;
      }
    };

    for (var armysize=1; armysize < 10; armysize++) {
      for (var dienum=1; dienum < 5; dienum++) {
	expect(logic.aShowDie(dienum, armysize, options)).toEqual(correctAnswers(dienum, armysize));
      }
    }
  });

  it('should show correct amount of dice for attacker w/ atkrad', function () {
    var options = {
      'firepower'        : false,
      'ambush'		 : false,
      'doublecasualties' : false,
      'bunker'		 : false,
      'atkrad'		 : true,
      'dfndrad'		 : false,
    };

    var correctAnswers = function (dienum, armysize) {
      if (armysize <= 1) {
	return false;
      } else if (armysize === 2 && dienum >= 2) {
	return false;
      } else if (armysize === 3 && dienum >= 2) {
	return false;
      } else if (armysize >= 4 && dienum >= 3) {
	return false;
      } else {
	return true;
      }
    };

    for (var armysize=1; armysize < 10; armysize++) {
      for (var dienum=1; dienum < 5; dienum++) {
	expect(logic.aShowDie(dienum, armysize, options)).toEqual(correctAnswers(dienum, armysize));
      }
    }
  });

  it('should show correct amount of dice for attacker w/ firepower and atkrad', function () {
    var options = {
      'firepower'        : true,
      'ambush'		 : false,
      'doublecasualties' : false,
      'bunker'		 : false,
      'atkrad'		 : true,
      'dfndrad'		 : false,
    };

    var correctAnswers = function (dienum, armysize) {
      if (armysize <= 1) {
	return false;
      } else if (armysize === 2 && dienum >= 2) {
	return false;
      } else if (armysize === 3 && dienum >= 3) {
	return false;
      } else if (armysize >= 4 && dienum >= 4) {
	return false;
      } else {
	return true;
      }
    };

    for (var armysize=1; armysize < 10; armysize++) {
      for (var dienum=1; dienum < 5; dienum++) {
	expect(logic.aShowDie(dienum, armysize, options)).toEqual(correctAnswers(dienum, armysize));
      }
    }
  });

  it('should show correct amount of dice for defender', function () {
    var options = {
      'firepower'        : false,
      'ambush'		 : false,
      'doublecasualties' : false,
      'bunker'		 : false,
      'atkrad'		 : false,
      'dfndrad'		 : false,
    };

    var correctAnswers = function (dienum, armysize) {
      if (armysize < 1) {
	return false;
      } else if (armysize === 1 && dienum > 1) {
	return false;
      } else if (armysize === 2 && dienum > 2) {
	return false;
      } else if (armysize >= 3 && dienum >= 3) {
	return false;
      } else {
	return true;
      }
    };

    for (var armysize=1; armysize < 10; armysize++) {
      for (var dienum=1; dienum < 4; dienum++) {
	expect(logic.dShowDie(dienum, armysize, options)).toEqual(correctAnswers(dienum, armysize));
      }
    }
  });

  it('should show correct amount of dice for defender w/ bunker', function () {
    var options = {
      'firepower'        : false,
      'ambush'		 : false,
      'doublecasualties' : false,
      'bunker'		 : true,
      'atkrad'		 : false,
      'dfndrad'		 : false,
    };

    var correctAnswers = function (dienum, armysize) {
      if (armysize < 1) {
	return false;
      } else if (armysize === 1 && dienum > 2) {
	return false;
      } else if (armysize === 2 && dienum > 3) {
	return false;
      } else if (armysize >= 3 && dienum >= 4) {
	return false;
      } else {
	return true;
      }
    };

    for (var armysize=1; armysize < 10; armysize++) {
      for (var dienum=1; dienum < 4; dienum++) {
	expect(logic.dShowDie(dienum, armysize, options)).toEqual(correctAnswers(dienum, armysize));
      }
    }
  });

  it('should show correct amount of dice for defender w/ dfndrad', function () {
    var options = {
      'firepower'        : false,
      'ambush'		 : false,
      'doublecasualties' : false,
      'bunker'		 : false,
      'atkrad'		 : false,
      'dfndrad'		 : true,
    };

    var correctAnswers = function (dienum, armysize) {
      if (armysize < 1) {
	return false;
      } else if (armysize === 1 && dienum > 1) {
	return false;
      } else if (armysize === 2 && dienum > 1) {
	return false;
      } else if (armysize >= 3 && dienum >= 2) {
	return false;
      } else {
	return true;
      }
    };

    for (var armysize=1; armysize < 10; armysize++) {
      for (var dienum=1; dienum < 4; dienum++) {
	expect(logic.dShowDie(dienum, armysize, options)).toEqual(correctAnswers(dienum, armysize));
      }
    }
  });

  it('should show correct amount of dice for defender w/ bunker and dfndrad', function () {
    var options = {
      'firepower'        : false,
      'ambush'		 : false,
      'doublecasualties' : false,
      'bunker'		 : true,
      'atkrad'		 : false,
      'dfndrad'		 : true,
    };

    var correctAnswers = function (dienum, armysize) {
      if (armysize < 1) {
	return false;
      } else if (armysize === 1 && dienum > 1) {
	return false;
      } else if (armysize === 2 && dienum > 2) {
	return false;
      } else if (armysize >= 3 && dienum >= 3) {
	return false;
      } else {
	return true;
      }
    };

    for (var armysize=1; armysize < 10; armysize++) {
      for (var dienum=1; dienum < 4; dienum++) {
	//dump(dienum + " " + armysize + " " + (dShowDie(dienum, armysize, options)=== correctAnswers(dienum, armysize)));
	expect(logic.dShowDie(dienum, armysize, options)).toEqual(correctAnswers(dienum, armysize));
      }
    }
  });

});
