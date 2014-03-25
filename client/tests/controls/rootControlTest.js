/*globals define, test, equal, ok, $*/

define(function (require) {
    'use strict';

    var can = require('can'),
        Control = require('controls/rootControl'),
        domTestLoader = require('tests/helpers/domTestLoader');

    domTestLoader.setupTestModule('rootControl');

    test('controls/layoutControl', function () {
        var $viewTests = $('body'),
            control = new Control($viewTests);

        ok(control.element.html(), "At least 1 char should be rendered");

        ok(control.element.width() === 0, "Should be hidden after init");

    });
});