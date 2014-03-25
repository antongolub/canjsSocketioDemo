/*globals define, test, equal, ok, $, document*/

define(function (require) {
    'use strict';

    var can = require('can'),
        pushstate = require('assets/pushstate');

    test('assets/pushstate', function () {
        pushstate("/users", "Test title", true);
        equal(document.location.pathname, "/users", "Pathname mismatch");

        pushstate("/");
        equal(document.location.pathname, "/", "Pathname mismatch");
    });
});