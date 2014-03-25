/*globals define, test, equal, ok, $, start, stop*/
/*jslint nomen: true */

define(function (require) {
    'use strict';

    var can = require('can'),
        Control = require('controls/user/userListControl'),
        domTestLoader = require('tests/helpers/domTestLoader');

    domTestLoader.setupTestModule('userListControl');

    test('controls/userListControl', function () {
        var $viewTests = $('#viewTests'),
            control = new Control($viewTests);

        // "Native" create
        stop();
        control.model.create({
            name: "Karma Test" + Math.random(),
            email: "karma@test.com"
        }).done(function () {
            control.fetch().done(function () {
                start();
                ok(!can.isDeferred(control.remove()), ".remove() should return null when id equals null");

                // "Remove btn" click handler
                ok(can.isDeferred(control.onRemoveClick({target: control.table.find("tbody tr:first-child td:last-child")})),
                    "Should return deferred if {id} specified");

            });
        });
    });
});