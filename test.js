// Generated by CoffeeScript 1.7.0
(function() {
  var AmorphousRecipe, CraftingThesaurus, Inventory, ItemPile, PositionalRecipe, Recipe, craftingGrid2, craftingGrid3, fillGrid, test, _ref;

  test = require('tape');

  _ref = require('./'), Recipe = _ref.Recipe, AmorphousRecipe = _ref.AmorphousRecipe, PositionalRecipe = _ref.PositionalRecipe, CraftingThesaurus = _ref.CraftingThesaurus;

  Inventory = require('inventory');

  ItemPile = require('itempile');

  test('thesaurus register', function(t) {
    var thesaurus;
    thesaurus = new CraftingThesaurus();
    t.equals(thesaurus.matchesName('logOak', new ItemPile('plankOak')), false);
    thesaurus.registerName('dye.black', 'squidInk');
    thesaurus.registerName('dye.black', 'syntheticBlackInk');
    thesaurus.registerName('dye.white', 'bonemeal');
    thesaurus.registerName('dye.white', 'bleach');
    t.equals(thesaurus.matchesName('dye.black', new ItemPile('squidInk')), true);
    t.equals(thesaurus.matchesName('dye.black', new ItemPile('syntheticBlackInk')), true);
    t.equals(thesaurus.matchesName('dye.black', new ItemPile('something')), false);
    t.equals(thesaurus.matchesName('dye.white', new ItemPile('bonemeal')), true);
    t.equals(thesaurus.matchesName('dye.white', new ItemPile('bleach')), true);
    t.equals(thesaurus.matchesName('dye.white', new ItemPile('dirt')), false);
    return t.end();
  });

  fillGrid = function(input, names) {
    var i, name, _i, _len;
    for (i = _i = 0, _len = names.length; _i < _len; i = ++_i) {
      name = names[i];
      if (name != null) {
        input.set(i, new ItemPile(name, 1));
      }
    }
    return input;
  };

  craftingGrid2 = function(names) {
    var input;
    input = new Inventory(2, 2);
    fillGrid(input, names);
    return input;
  };

  craftingGrid3 = function(names) {
    var input;
    input = new Inventory(3, 3);
    fillGrid(input, names);
    return input;
  };

  test('amorphous simple recipe match', function(t) {
    var r;
    r = new AmorphousRecipe(['log'], new ItemPile('plank'));
    t.equals(r.matches(craftingGrid2([])), false);
    t.equals(r.matches(craftingGrid2(['cheeselog'])), false);
    t.equals(r.matches(craftingGrid2(['log'])), true);
    t.equals(r.matches(craftingGrid2([void 0, 'log'])), true);
    t.equals(r.matches(craftingGrid2([void 0, void 0, 'log'])), true);
    t.equals(r.matches(craftingGrid2([void 0, void 0, void 0, 'log'])), true);
    return t.end();
  });

  test('amorphous double ingredients', function(t) {
    var r;
    r = new AmorphousRecipe(['plank', 'plank'], new ItemPile('stick'));
    t.equals(r.matches(craftingGrid2(['plank'])), false);
    t.equals(r.matches(craftingGrid2(['plank', 'plank'])), true);
    t.equals(r.matches(craftingGrid2([void 0, 'plank', 'plank'])), true);
    t.equals(r.matches(craftingGrid2([void 0, void 0, 'plank', 'plank'])), true);
    t.equals(r.matches(craftingGrid2(['plank', void 0, 'plank'])), true);
    t.equals(r.matches(craftingGrid2([void 0, 'plank', void 0, 'plank'])), true);
    t.equals(r.matches(craftingGrid2([void 0, 'plank', void 0])), false);
    return t.end();
  });

  test('amorphous extraneous inputs', function(t) {
    var r;
    r = new AmorphousRecipe(['plank', 'plank'], new ItemPile('stick'));
    t.equals(r.matches(craftingGrid2(['plank', 'plank', 'plank'])), false);
    t.equals(r.matches(craftingGrid2(['plank', 'plank', 'plank', 'plank'])), false);
    return t.end();
  });

  test('craft thesaurus', function(t) {
    var r, thesaurus;
    r = new AmorphousRecipe(['wood.log'], new ItemPile('plank'));
    thesaurus = new CraftingThesaurus();
    thesaurus.registerName('wood.log', 'logOak');
    thesaurus.registerName('wood.log', 'logBirch');
    t.equals(r.matches(craftingGrid2(['wood.log'])), true);
    t.equals(r.matches(craftingGrid2(['logOak'])), true);
    t.equals(r.matches(craftingGrid2(['logBirch'])), true);
    t.equals(r.matches(craftingGrid2(['logWhatever'])), false);
    return t.end();
  });

  test('take craft empty', function(t) {
    var grid, output, r;
    r = new AmorphousRecipe(['log'], new ItemPile('plank'));
    grid = craftingGrid2(['log']);
    output = r.craft(grid);
    t.equals(!!output, true);
    console.log('output', output);
    t.equals(output.item, 'plank');
    t.equals(grid.get(0), void 0);
    t.equals(grid.get(1), void 0);
    t.equals(grid.get(2), void 0);
    t.equals(grid.get(3), void 0);
    return t.end();
  });

  test('take craft leftover', function(t) {
    var grid, output, r;
    r = new AmorphousRecipe(['log'], new ItemPile('plank'));
    grid = new Inventory(4);
    grid.set(0, new ItemPile('log', 10));
    output = r.craft(grid);
    t.equals(!!output, true);
    console.log('output', output);
    t.equals(output.item, 'plank');
    console.log('new grid', grid);
    t.equals(grid.get(0) !== void 0, true);
    t.equals(grid.get(0).count, 9);
    t.equals(grid.get(0).item, 'log');
    t.equals(grid.get(1), void 0);
    t.equals(grid.get(2), void 0);
    t.equals(grid.get(3), void 0);
    return t.end();
  });

  test('positional recipe match one row', function(t) {
    var r;
    r = new PositionalRecipe([['first', 'second']], new ItemPile('output', 2));
    t.equal(r.matches(craftingGrid2(['first', 'second'])), true);
    t.equal(r.matches(craftingGrid2(['first'])), false);
    t.equal(r.matches(craftingGrid2(['second'])), false);
    t.equal(r.matches(craftingGrid2(['second', 'first'])), false);
    t.equal(r.matches(craftingGrid2([void 0, 'first'])), false);
    t.equal(r.matches(craftingGrid2([void 0, 'first', 'second'])), false);
    return t.end();
  });

  test('positional recipe match two rows', function(t) {
    var r;
    r = new PositionalRecipe([['ingot', void 0, 'ingot'], [void 0, 'ingot', void 0]], new ItemPile('bucket'));
    t.equal(r.matches(craftingGrid3(['ingot', void 0, 'ingot', void 0, 'ingot'])), true);
    t.equal(r.matches(craftingGrid3(['ingot', void 0, 'ingot'])), false);
    t.equal(r.matches(craftingGrid3(['ingot'])), false);
    return t.end();
  });

  test('positional recipe craft', function(t) {
    var grid, i, output, r, _i, _ref1;
    r = new PositionalRecipe([['ingot', void 0, 'ingot'], [void 0, 'ingot', void 0]], new ItemPile('bucket'));
    grid = craftingGrid3(['ingot', void 0, 'ingot', void 0, 'ingot']);
    output = r.craft(grid);
    t.equals(!!output, true);
    t.equals(output.item, 'bucket');
    console.log('new grid', grid);
    for (i = _i = 0, _ref1 = grid.size(); 0 <= _ref1 ? _i < _ref1 : _i > _ref1; i = 0 <= _ref1 ? ++_i : --_i) {
      t.equals(grid.get(i), void 0);
    }
    return t.end();
  });

  test('positional recipe craft leftover', function(t) {
    var grid, i, output, r, _i, _ref1;
    r = new PositionalRecipe([['ingot', void 0, 'ingot'], [void 0, 'ingot', void 0]], new ItemPile('bucket'));
    grid = new Inventory(3, 3);
    grid.set(0, new ItemPile('ingot', 10));
    grid.set(2, new ItemPile('ingot', 5));
    grid.set(4, new ItemPile('ingot', 3));
    output = r.craft(grid);
    t.equals(!!output, true);
    t.equals(output.item, 'bucket');
    console.log('new grid', grid);
    t.equal(grid.get(0) !== void 0, true);
    t.equal(grid.get(0).item, 'ingot');
    t.equal(grid.get(0).count, 10 - 1);
    t.equal(grid.get(2) !== void 0, true);
    t.equal(grid.get(2).item, 'ingot');
    t.equal(grid.get(2).count, 5 - 1);
    t.equal(grid.get(4) !== void 0, true);
    t.equal(grid.get(4).item, 'ingot');
    t.equal(grid.get(4).count, 3 - 1);
    for (i = _i = 0, _ref1 = grid.size(); 0 <= _ref1 ? _i < _ref1 : _i > _ref1; i = 0 <= _ref1 ? ++_i : --_i) {
      if (i === 0 || i === 2 || i === 4) {
        continue;
      }
      t.equals(grid.get(i), void 0);
    }
    return t.end();
  });

  test('positional recipe three rows', function(t) {
    var grid, i, output, r, _i, _ref1;
    r = new PositionalRecipe([['wood.plank', 'wood.plank', 'wood.plank'], [void 0, 'stick', void 0], [void 0, 'stick', void 0]], new ItemPile('pickaxeWood', 1));
    grid = craftingGrid3(['wood.plank', 'wood.plank', 'wood.plank', void 0, 'stick', void 0, void 0, 'stick', void 0]);
    output = r.craft(grid);
    t.equals(!!output, true);
    t.equals(output.item, 'pickaxeWood');
    for (i = _i = 0, _ref1 = grid.size(); 0 <= _ref1 ? _i < _ref1 : _i > _ref1; i = 0 <= _ref1 ? ++_i : --_i) {
      t.equals(grid.get(i), void 0);
    }
    return t.end();
  });

}).call(this);
