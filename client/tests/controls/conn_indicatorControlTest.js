/*globals define, test, equal, ok, $*/

define(function (require) {
    'use strict';

    var can = require('can'),
        Control = require('controls/conn_indicatorControl'),
        domTestLoader = require('tests/helpers/domTestLoader');

    domTestLoader.setupTestModule('conn_indicatorControl');

    test('controls/conn_indicatorControl', function () {
        var $viewTests = $('#viewTests'),
            control = new Control($viewTests);

        control.onconnect();
        ok(control.element.is('.b-conn_indicator--online'), "Indicator should not have specified class");

        control.switchState();
        control.ondisconnect(); // also switches down
        ok(!control.element.is('.b-conn_indicator--online'), "Indicator should have specified class");

    });
});

