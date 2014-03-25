/*globals define, test, equal, ok, $*/

define(function (require) {
    'use strict';

    var can = require('can'),
        menuView = require('views/menuView'),
        domTestLoader = require('tests/helpers/domTestLoader');

    domTestLoader.setupTestModule('menuView');

    test('views/menuView', function () {
        var Control = can.Control.extend({
                init: function () {
                    this.element.append(menuView());
                }
            }), $viewTests = $('#viewTests'),
            control = new Control($viewTests);


        ok($viewTests.text(), 'Should be rendered at least 1 char');
        ok($viewTests.find("li").size(), 'At least one li block should be rendered');

    });
});
