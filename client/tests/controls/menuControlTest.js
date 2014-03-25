/*globals define, test, equal, ok, $*/

define(function (require) {
    'use strict';

    var can = require('can'),
        Control = require('controls/menuControl'),
        domTestLoader = require('tests/helpers/domTestLoader');

    domTestLoader.setupTestModule('menuControl');

    test('controls/menuControl', function () {
        var $viewTests = $('#viewTests'),
            control = new Control($viewTests);

        equal(control.onRouteChange(null, "route"), "[href='/']", "Should return [href='/']");
        equal(control.onRouteChange(null, "route", null, "users/:id"), "[href^='/users']", "Should return [href^='/users']");
        equal(control.onRouteChange(null, "route", null, "users"), "[href^='/users']", "Should return [href^='/users']");

        control.switchItem("[href^='/']", "test");
        ok(control.items.filter(".test").size() > 0, "Class 'test' should be set for [href^='/']");
    });
});