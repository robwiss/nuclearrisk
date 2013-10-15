/*exported logic */
'use strict';

var logic = (function() {

  // attach public methods to this object
  var module = {};
  module.rollNDie = function(n) {
    return Math.floor((Math.random()*n)+1);
  };

  // function for determining whether or not an attacking die can be
  // displayed
  module.aShowDie = function(dieNum, armysize, options) {
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
  module.dShowDie = function(dieNum, armysize, options) {
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

  return module;
}());

