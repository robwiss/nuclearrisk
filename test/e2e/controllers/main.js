
describe('Diceroller app', function() {

  describe('Modifiers', function() {
    beforeEach(function() {
      // browser().navigateTo('../../../index.html');
      browser().navigateTo('/');
    });

    it('should select max num dice for defender when bunker is clicked after dfnd rad', function() {
      input('dArmysize').enter('100');
      expect(element('input[ng-model="dArmysize"]').val()).toBe("100");
//      expect(element('input[btn-radio=2]:checked').val()).toBe("2")
//      expect('dNumrolls').toBe(2);
//      input('dfndrad').check();
//      expect('dfndrad').toBe(1);
//      input('bunker').check();
//      expect('bunker').toBe(1);
//      
//      expect('dNumrolls').toBe(2);
    });
  });

});
