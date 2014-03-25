/*globals define, test, equal, ok, $*/

define(function (require) {
    'use strict';

    var can = require('can'),
        LayoutControl = require('controls/layoutControl'),
        domTestLoader = require('tests/helpers/domTestLoader');

    domTestLoader.setupTestModule('layoutControl');

    test('controls/layoutControl', function () {
        var $viewTests = $('#viewTests'),
            control = new LayoutControl($viewTests);

        ok(!control.onsubmit($.Event("submit"), "Submit should return false"));
    });
});

