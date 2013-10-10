
describe('Diceroller app', function() {

  describe('Modifiers', function() {
    beforeEach(function() {
      browser().navigateTo('/');
    });

    it('should select max num dice for defender when bunker is clicked after dfnd rad', function() {
      input('dArmysize').enter('100');
      expect(element('input[ng-model="dArmysize"]').val()).toBe("100");
      expect(element('button[ng-model="dNumrolls"][class*="active"]').text()).toBe("2");
      element('button[ng-model="dfndrad"]').click();
      expect(element('button[ng-model="dNumrolls"][class*="active"]').text()).toBe("1");
      element('button[ng-model="bunker"]').click();
      expect(element('button[ng-model="dNumrolls"][class*="active"]').text()).toBe("2");
    });
  });

});
