// Generated by CoffeeScript 1.6.3
(function() {
  var AmorphousRecipe, Inventory, ItemPile, PositionalRecipe, Recipe, test, _ref;

  test = require('tape');

  _ref = require('./'), Recipe = _ref.Recipe, AmorphousRecipe = _ref.AmorphousRecipe, PositionalRecipe = _ref.PositionalRecipe;

  Inventory = require('inventory');

  ItemPile = require('itempile');

  test('recipe', function(t) {
    var input, r;
    r = new AmorphousRecipe(['log'], 'plank');
    console.log(r);
    input = new Inventory(4);
    input.set(0, new ItemPile('log'));
    console.log('input=' + input);
    console.log(r.matches(input));
    return t.end();
  });

}).call(this);
