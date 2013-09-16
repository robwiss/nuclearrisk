var app = angular.module('diceroller', []);

var rollNDie = function(n) {
    return Math.floor((Math.random()*n)+1);
}

var copyArray = function(dst,src) {
    for (var i=0; i < src.length; i++) dst[i] = src[i];
    return dst;
}

var diceStrMap = {
    1 : "\u2680",
    2 : "\u2681",
    3 : "\u2682",
    4 : "\u2683",
    5 : "\u2684",
    6 : "\u2685"
}

var diceStrFromArr = function(values) {
    result_str = "";
    for (var i=0; i < values.length; i++) {
	result_str += diceStrMap[values[i]];
	if (i < values.length - 1) {
	    result_str += " ";
	}
    }

    return result_str;
}

app.run(
    function($rootScope) {
	// set default dice values
	$rootScope.a_numrolls = 0;
	$rootScope.d_numrolls = 0;
	
	$rootScope.clearResults = function() {
	    $rootScope.a_rolls = null;
	    $rootScope.d_rolls = null;
	    $rootScope.a_loses = null;
	    $rootScope.d_loses = null;
	}

	$rootScope.a_armysize_refresh = function() {
	    var a_armysize = parseInt($rootScope.a_armysize);
	    var a_numrolls = parseInt($rootScope.a_numrolls);
	    // if armysize is not enough to roll dice
	    if (!a_armysize || a_armysize < 2) {
		$rootScope.a_numrolls = 0;
		return;
	    }
	    
	    // if a number of rolls is selected and armysize is enough to roll
	    // the currently selected amount of dice
	    if (a_numrolls > 0 && a_numrolls < a_armysize) {
		return;
	    }

	    // if no valid number of rolls is selected
	    if (a_armysize < 5) {
		$rootScope.a_numrolls = a_armysize - 1;
	    }
	    else {
		$rootScope.a_numrolls = 3;
	    }
	}

	$rootScope.d_armysize_refresh = function() {
	    var d_armysize = parseInt($rootScope.d_armysize);
	    var d_numrolls = parseInt($rootScope.d_numrolls);
	    // if armysize is not enough to roll dice
	    if (!d_armysize || d_armysize < 0) {
		$rootScope.d_numrolls = 0;
		return;
	    }

	    // if a number of rolls is selected and armysize is enough to roll
	    // the currently selected amount of dice
	    if (d_numrolls > 0 && d_numrolls <= d_armysize) {
		return;
	    }

	    // if no valid number of rolls is selected
	    if (d_armysize < 3) {
		$rootScope.d_numrolls = d_armysize;
	    }
	    else {
		$rootScope.d_numrolls = 2;
	    }
	}

	$rootScope.a_armysize_update = function() {
	    $rootScope.clearResults();
	    $rootScope.a_numrolls = 0;
	    $rootScope.a_armysize_refresh();
	}

	$rootScope.d_armysize_update = function() {
	    $rootScope.clearResults();
	    $rootScope.d_numrolls = 0;
	    $rootScope.d_armysize_refresh();
	}

	$rootScope.rollOnce = function() {
	    var a_armysize = parseInt($rootScope.a_armysize);
	    var a_survive  = parseInt($rootScope.a_survive);
	    var a_numrolls = parseInt($rootScope.a_numrolls);
	    var d_armysize = parseInt($rootScope.d_armysize);
	    var d_numrolls = parseInt($rootScope.d_numrolls);

	    if (!a_numrolls || !d_numrolls ||
		a_numrolls < 1 || d_numrolls < 1) {
		return
	    }

	    var m_firepower    = $rootScope.firepower;
	    var m_ambush       = $rootScope.ambush;
	    var m_2xcasualties = $rootScope.doublecasualties;
	    var m_bunker       = $rootScope.bunker;
	    var m_atkrad       = $rootScope.atkrad;
	    var m_dfndrad      = $rootScope.dfndrad;

	    // add an extra die to the attacker for firepower
	    if (m_firepower == true) {
		a_numrolls += 1;
	    }

	    // add a die to defender for bunker
	    if (m_bunker == true) {
		d_numrolls += 1;
	    }

	    // subtract a die from attacker for radiation, min 1 die
	    if (m_atkrad == true) {
		a_numrolls -= 1;
		if (a_numrolls < 1) a_numrolls = 1;
	    }

	    // subtract a die from defender for radiation unless in bunker, min
	    // 1 die	    
	    if (m_dfndrad == true && !m_bunker) {
		d_numrolls -= 1;
		if (d_numrolls < 1) d_numrolls = 1;
	    }

	    var a_rolls = [];
	    for (var i=0; i < a_numrolls; i++) {
		a_rolls.push(rollNDie(6));
	    }
	    
	    var d_rolls = [];
	    for (var i=0; i < d_numrolls; i++) {
		d_rolls.push(rollNDie(6));
	    }
	    
	    // These need to be sorted for the code that decides who won.
	    // They are sorted before they are copied into the rootScope 
	    // objects so that they'll appear sorted for the user.
	    a_rolls.sort(function(a,b){return b-a});
	    d_rolls.sort(function(a,b){return b-a});
	    
	    $rootScope.a_rolls = diceStrFromArr(a_rolls);
	    $rootScope.d_rolls = diceStrFromArr(d_rolls);

	    // number of times to compare the resulting dice is the max of
	    // how many rolls attacker and defender got
	    var d_loses = 0
	    var comparisons = Math.min(a_numrolls, Math.min(d_numrolls, 2))
	    for (var i=0; i < comparisons; i++) {
		var a_max = a_rolls[0];
		var d_max = d_rolls[0];
		
		// ambush rules, ties go to attacker
		if (m_ambush == true) {
		    if (a_max >= d_max) { d_loses++; }
		}
		// regular rules, ties go to defender
		else if (a_max > d_max) { d_loses++; }
		
		// shift the max from each array
		a_rolls.shift();
		d_rolls.shift();
	    }
	    var a_loses = comparisons - d_loses;

	    // in double casualties defender loses 2x
	    if (m_2xcasualties == true) {
		d_loses *= 2;
	    }

	    a_armysize = Math.max(a_armysize - a_loses, 0);
	    d_armysize = Math.max(d_armysize - d_loses, 0);
	    // if defender is dead replace army size w/ skull and crossbones
	    if (d_armysize == 0) d_armysize = "\u2620";
	    $rootScope.a_armysize = a_armysize;
	    $rootScope.d_armysize = d_armysize;
	    $rootScope.d_loses = d_loses;
	    $rootScope.a_loses = a_loses;
	}
    }
);
