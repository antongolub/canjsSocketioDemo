/*globals define, test, equal, ok, $*/

define(function (require) {
    'use strict';

    var can = require('can'),
        userModel = require('models/userModel')();

    test('models/userModel', function () {
        // Email attr
        equal(userModel.errors().email, "email required", "Empty attr {email} error should be shown");

        userModel.attr("email", "test@test");
        equal(userModel.errors().email, "correct email required", "Correct attr {email} error should be shown");

        userModel.attr("email", "test@test.com");
        equal(userModel.errors().email, null, "Should return null as attr {email} error");

        //Name attr
        equal(userModel.errors().name, "name required", "Empty attr {name} error should be shown");

        userModel.attr("name", "Test");
        equal(userModel.errors(), null, "Should return null as fully correct model marker");
    });
});
