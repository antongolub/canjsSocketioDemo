/*globals define, test, equal, ok, $, start, stop*/
/*jslint nomen: true */

define(function (require) {
    'use strict';

    var can = require('can'),
        Control = require('controls/user/userControl'),
        domTestLoader = require('tests/helpers/domTestLoader');

    domTestLoader.setupTestModule('userControl');

    test('controls/userControl', function () {
        var $viewTests = $('#viewTests'),
            control = new Control($viewTests),
            ERR = "b-section--error",
            NEW = "b-section--new";

        control.model.attr({
            name: "Karma Test",
            email: "karma@test.com"
        });

        // Creates new one as upsert
        ok(can.isDeferred(control.save().then(function () {
            control.remove();

        })), "Should return deferred on save");

        // Remove
        ok(can.isDeferred(control.remove()), "Should return deferred on remove");


        // Erase attr
        control.model.attr("name", null);
        equal(control.save().name, "name required", "Invalid {name} value should be detected on save ");

        // Fetch by id
        ok(can.isDeferred(control.fetch({id: 1})), "Deferred should be returned on .fetch()");
        control.show({id: 1});



        // Mode switch
        control.toggleViewMode();
        ok(control.element.hasClass(ERR), "Section class isnt '--error'");

        control.id  = "new";
        control.toggleViewMode();
        ok(control.element.hasClass(NEW), "Section class isnt '--new'");

        control.onModelSave({id: 1});
        ok(!control.element.hasClass(NEW), "Section class shouldn't be '--new'");

        // Fetch success
        control.onModelUpdate({id: 1});
        ok(!control.element.is("." + NEW + ", ." + ERR), "Section should have any --mod class");

        // "Native" create
        stop();
        control.model.create({
            name: "Karma Test" + Math.random(),
            email: "karma@test.com"
        }).done(function (data) {
            start();
            ok(can.isDeferred(control.model.destroy(data.id)), "Expected deferred as .destroy() return");
        });

    });
});