'use strict';

var rollNDie = function(n) {
  return Math.floor((Math.random()*n)+1);
};

var diceStrMap = {
  1 : '\u2680',
  2 : '\u2681',
  3 : '\u2682',
  4 : '\u2683',
  5 : '\u2684',
  6 : '\u2685'
};

var diceStrFromArr = function(values) {
  var resultStr = '';
  for (var i=0; i < values.length; i++) {
    resultStr += diceStrMap[values[i]];
    if (i < values.length - 1) {
      resultStr += ' ';
    }
  }

  return resultStr;
};

// function for determining whether or not an attacking die can be
// displayed
var aShowDie = function(dieNum, armysize, options) {
  if (armysize <= 1) {
    return false;
  }

  if (!options.firepower && dieNum === 4) {
    return false;
  }

  if (options.firepower) {
    armysize += 1;
  }

  var loseDie = false;
  if (options.atkrad) {
    // compute a dieMax representing the max value a die can be
    // given that radiation has taken a die away
    var dieMax = Math.min(armysize - 1, options.firepower ? 4 : 3);

    // lose the die if it is the max die or greater but only if it's
    // not die #1 (can't lose the last die)
    loseDie = dieNum >= dieMax && dieNum !== 1;
  }

  return armysize > dieNum && !loseDie;
};

// function for determining whether or not a defending die can be
// displayed
var dShowDie = function(dieNum, armysize, options) {
  if (armysize <= 0) {
    return false;
  }

  if (!options.bunker && dieNum === 3) {
    return false;
  }

  if (options.bunker) {
    armysize += 1;
  }

  var loseDie = false;
  if (options.dfndrad) {
    // compute a dieMax representing the max value a die can be
    // given that radiation has taken a die away
    var dieMax = Math.min(armysize - (options.bunker ? 0 : 1), options.bunker ? 3 : 2);
    
    // lose the die if it is the max die or greater but only if it's
    // not die #1 (can't lose the last die)
    loseDie = dieNum >= dieMax && dieNum !== 1;
  }

  return armysize >= dieNum && !loseDie;
};

angular.module('dicerollerApp')
  .controller('MainCtrl', function ($scope) {
    // set default dice values
    $scope.aNumrolls = 0;
    $scope.dNumrolls = 0;
    
    $scope.getOptions = function() {
      var options = {
        'firepower'        : $scope.firepower === 1,
        'ambush'           : $scope.ambush === 1,
        'doublecasualties' : $scope.doublecasualties === 1,
        'bunker'           : $scope.bunker === 1,
        'atkrad'           : $scope.atkrad === 1,
        'dfndrad'          : $scope.dfndrad === 1
      };

      return options;
    };

    $scope.clearResults = function() {
      $scope.aRolls = null;
      $scope.dRolls = null;
      $scope.aLoses = null;
      $scope.dLoses = null;
    };

    $scope.aArmysizeRefresh = function(reset) {
      // reset is a default parameter for whether or not to reset the 
      // die values to the current maximum
      reset = typeof reset !== 'undefined' ? reset : false;

      var aArmysize = parseInt($scope.aArmysize, 10);
      var aNumrolls = parseInt($scope.aNumrolls, 10);
      // if armysize is not enough to roll dice
      if (!aArmysize || aArmysize < 2) {
        $scope.aNumrolls = 0;
        return;
      }
      
      // if a number of rolls is selected and armysize is enough to roll
      // the currently selected amount of dice
      if (aNumrolls > 0 && $scope.aShowDie(aNumrolls) && !reset) {
        return;
      }

      // select the largest available die
      for (var i=4; i > 0; i--) {
        if ($scope.aShowDie(i)) {
          $scope.aNumrolls = i;
          return;
        }
      }
    };

    $scope.dArmysizeRefresh = function(reset) {
      // reset is a default parameter for whether or not to reset the 
      // die values to the current maximum
      reset = typeof reset !== 'undefined' ? reset : false;

      var dArmysize = parseInt($scope.dArmysize, 10);
      var dNumrolls = parseInt($scope.dNumrolls, 10);
      // if armysize is not enough to roll dice
      if (!dArmysize || dArmysize < 0) {
        $scope.dNumrolls = 0;
        return;
      }

      // if a number of rolls is selected and armysize is enough to roll
      // the currently selected amount of dice     
      if (dNumrolls > 0 && $scope.dShowDie(dNumrolls) && !reset) {
        return;
      }

      // select the largest available die
      for (var i=3; i > 0; i--) {
        if ($scope.dShowDie(i)) {
          $scope.dNumrolls = i;
          return;
        }
      }
    };

    $scope.aArmysizeUpdate = function() {
      $scope.clearResults();
      $scope.aNumrolls = 0;
      $scope.aArmysizeRefresh();
    };

    $scope.dArmysizeUpdate = function() {
      $scope.clearResults();
      $scope.dNumrolls = 0;
      $scope.dArmysizeRefresh();
    };

    $scope.aShowDie = function(dienum) {
      var options = $scope.getOptions();
      var aArmysize = parseInt($scope.aArmysize, 10);
      return aShowDie(dienum, aArmysize, options);
    };

    $scope.dShowDie = function(dienum) {
      var options = $scope.getOptions();
      var dArmysize = parseInt($scope.dArmysize, 10);
      return dShowDie(dienum, dArmysize, options);
    };
    
    $scope.rollOnce = function() {
      var aArmysize = parseInt($scope.aArmysize, 10);
      var aNumrolls = parseInt($scope.aNumrolls, 10);
      var dArmysize = parseInt($scope.dArmysize, 10);
      var dNumrolls = parseInt($scope.dNumrolls, 10);

      if (!aNumrolls || !dNumrolls ||
          aNumrolls < 1 || dNumrolls < 1) {
        return;
      }

      var mAmbush       = $scope.ambush === 1;
      var m2xcasualties = $scope.doublecasualties === 1;

      var i=0;
      var aRolls = [];
      for (i=0; i < aNumrolls; i++) {
        aRolls.push(rollNDie(6));
      }
      
      var dRolls = [];
      for (i=0; i < dNumrolls; i++) {
        dRolls.push(rollNDie(6));
      }
      
      // These need to be sorted for the code that decides who won.
      // They are sorted before they are copied into the scope 
      // objects so that they'll appear sorted for the user.
      aRolls.sort(function(a,b){return b-a;});
      dRolls.sort(function(a,b){return b-a;});
      
      $scope.aRolls = diceStrFromArr(aRolls);
      $scope.dRolls = diceStrFromArr(dRolls);

      // number of times to compare the resulting dice is the max of
      // how many rolls attacker and defender got
      var dLoses = 0;
      var comparisons = Math.min(aNumrolls, Math.min(dNumrolls, 2));
      for (i=0; i < comparisons; i++) {
        var aMax = aRolls[0];
        var dMax = dRolls[0];
        
        // ambush rules, ties go to attacker
        if (mAmbush === true) {
          if (aMax >= dMax) { dLoses++; }
        }
        // regular rules, ties go to defender
        else if (aMax > dMax) { dLoses++; }
        
        // shift the max from each array
        aRolls.shift();
        dRolls.shift();
      }
      var aLoses = comparisons - dLoses;

      // in double casualties defender loses 2x
      if (m2xcasualties === true) {
        dLoses *= 2;
      }

      aArmysize = Math.max(aArmysize - aLoses, 0);
      dArmysize = Math.max(dArmysize - dLoses, 0);
      // if defender is dead replace army size w/ skull and crossbones
      if (dArmysize === 0) {
        dArmysize = '\u2620';
      }
      $scope.aArmysize = aArmysize;
      $scope.dArmysize = dArmysize;
      $scope.dLoses = dLoses;
      $scope.aLoses = aLoses;
    };
  });
