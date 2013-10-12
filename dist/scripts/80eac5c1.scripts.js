"use strict";angular.module("dicerollerApp",["ui.bootstrap"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}]);var rollNDie=function(a){return Math.floor(Math.random()*a+1)},diceStrMap={1:"⚀",2:"⚁",3:"⚂",4:"⚃",5:"⚄",6:"⚅"},diceStrFromArr=function(a){for(var b="",c=0;c<a.length;c++)b+=diceStrMap[a[c]],c<a.length-1&&(b+=" ");return b},aShowDie=function(a,b,c){if(1>=b)return!1;if(!c.firepower&&4===a)return!1;c.firepower&&(b+=1);var d=!1;if(c.atkrad){var e=Math.min(b-1,c.firepower?4:3);d=a>=e&&1!==a}return b>a&&!d},dShowDie=function(a,b,c){if(0>=b)return!1;if(!c.bunker&&3===a)return!1;c.bunker&&(b+=1);var d=!1;if(c.dfndrad){var e=Math.min(b-(c.bunker?0:1),c.bunker?3:2);d=a>=e&&1!==a}return b>=a&&!d};angular.module("dicerollerApp").controller("MainCtrl",["$scope",function(a){a.aNumrolls=0,a.dNumrolls=0,a.getOptions=function(){var b={firepower:1===a.firepower,ambush:1===a.ambush,doublecasualties:1===a.doublecasualties,bunker:1===a.bunker,atkrad:1===a.atkrad,dfndrad:1===a.dfndrad};return b},a.clearResults=function(){a.aRolls=null,a.dRolls=null,a.aLoses=null,a.dLoses=null},a.aArmysizeRefresh=function(b){b="undefined"!=typeof b?b:!1;var c=parseInt(a.aArmysize,10),d=parseInt(a.aNumrolls,10);if(!c||2>c)return a.aNumrolls=0,void 0;if(!(d>0&&a.aShowDie(d))||b)for(var e=4;e>0;e--)if(a.aShowDie(e))return a.aNumrolls=e,void 0},a.dArmysizeRefresh=function(b){b="undefined"!=typeof b?b:!1;var c=parseInt(a.dArmysize,10),d=parseInt(a.dNumrolls,10);if(!c||0>c)return a.dNumrolls=0,void 0;if(!(d>0&&a.dShowDie(d))||b)for(var e=3;e>0;e--)if(a.dShowDie(e))return a.dNumrolls=e,void 0},a.aArmysizeUpdate=function(){a.clearResults(),a.aNumrolls=0,a.aArmysizeRefresh()},a.dArmysizeUpdate=function(){a.clearResults(),a.dNumrolls=0,a.dArmysizeRefresh()},a.aShowDie=function(b){var c=a.getOptions(),d=parseInt(a.aArmysize,10);return aShowDie(b,d,c)},a.dShowDie=function(b){var c=a.getOptions(),d=parseInt(a.dArmysize,10);return dShowDie(b,d,c)},a.rollOnce=function(){var b=parseInt(a.aArmysize,10),c=parseInt(a.aNumrolls,10),d=parseInt(a.dArmysize,10),e=parseInt(a.dNumrolls,10);if(!(!c||!e||1>c||1>e)){var f=1===a.ambush,g=1===a.doublecasualties,h=0,i=[];for(h=0;c>h;h++)i.push(rollNDie(6));var j=[];for(h=0;e>h;h++)j.push(rollNDie(6));i.sort(function(a,b){return b-a}),j.sort(function(a,b){return b-a}),a.aRolls=diceStrFromArr(i),a.dRolls=diceStrFromArr(j);var k=0,l=Math.min(c,Math.min(e,2));for(h=0;l>h;h++){var m=i[0],n=j[0];f===!0?m>=n&&k++:m>n&&k++,i.shift(),j.shift()}var o=l-k;g===!0&&(k*=2),b=Math.max(b-o,0),d=Math.max(d-k,0),0===d&&(d="☠"),a.aArmysize=b,a.dArmysize=d,a.dLoses=k,a.aLoses=o}}}]);