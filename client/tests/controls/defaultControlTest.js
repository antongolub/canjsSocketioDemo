/*globals define, test, equal, ok, $*/

define(function (require) {
    'use strict';

    var can = require('can'),
        Control = require('controls/defaultControl'),
        domTestLoader = require('tests/helpers/domTestLoader');

    domTestLoader.setupTestModule('menuControl');

    test('controls/menuControl', function () {
        var $viewTests = $('#viewTests'), control;

        Control.extend({
            init: function () {
                var self = this;
                self.element.html("test");
            }
        });
        control = new Control($viewTests);
        control.hide();
        ok(control.element.width() === 0, "Element should be hidden");

        control.show();
        ok(control.element.width() > 0, "Element should be displayed");
    });
});