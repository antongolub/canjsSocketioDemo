/*globals require, define, module, $*/

define(function (require) {
    'use strict';
    return {
        setupTestModule: function (moduleName) {
            module(moduleName, {
                setup: function () {
                    $('body').append('<div id="viewTests"></div>');
                },
                teardown: function () {
                    $("body").html();
                }
            });
        }
    };
});
