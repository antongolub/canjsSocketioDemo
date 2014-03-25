/*globals define, test, equal, ok, $*/

define(function (require) {
    'use strict';

    var can = require('can'),
        layoutView = require('views/layoutView'),
        domTestLoader = require('tests/helpers/domTestLoader');

    domTestLoader.setupTestModule('layoutView');

    test('views/layoutView', function () {
        var Control = can.Control.extend({
            init: function () {
                this.element.append(layoutView());
            }
        }), $viewTests = $('#viewTests'),
            control = new Control($viewTests);


        ok(control.init, "Init failure");
        ok($viewTests.text(), 'Should be rendered at least 1 char');
        ok($viewTests.find("#layout").size(), '#layout block should be rendered');

    });
});
