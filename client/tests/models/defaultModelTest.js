/*globals define, test, equal, ok, $*/

define(function (require) {
    'use strict';

    var can = require('can'),
        Model = require('models/defaultModel'),
        model;


    test('models/defaultModel', function () {
        model = (new Model("api/test"))();

        ok(can.isDeferred(model.create(), ".create() should return deferred"));
        model.attr({name: "Test", email: "test@test.com"});
        ok(can.isDeferred(model.create().then(function () {})), ".create() should return deferred");


        ok(can.isDeferred(model.findOne()), ".findOne() should return deferred");
        ok(can.isDeferred(model.findAll()), ".findAll() should return deferred");
        ok(can.isDeferred(model.update()), ".update() should return deferred");
        ok(can.isDeferred(model.destroy()), ".destroy() should return deferred");

        model = new Model();
        ok(!model.create, ".create() method should not be defined");
    });
});
