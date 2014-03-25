/*global require, define, $ */

/**
 * @module layoutControl
 */

define([
    'can',
    'views/layoutView',
    "controls/menuControl",
    'controls/conn_indicatorControl'],
    /**
     * @name module:layoutControl
     * @description Basic application layout control
     * @see module:layoutView
     * @see module:menuControl
     * @see module:conn_indicatorControl
     * @class can.Control
     * @extends can.Control
     * @constructor
     * @requires can {Object} canjs
     * @requires module:layoutView {Function}
     * @requires module:menuControl {Function}
     * @requires module:conn_indicatorControl {Function}
     * @returns can.Control {Function} constructor
     */
        function (can, view, MenuControl, Conn_indicatorControl) {
        'use strict';

        return can.Control({
            /**
             * @name module:layoutControl#init
             * @description Appends layout view to DOM
             * @function
             */
            init: function () {
                var self = this;

                self.element = self.element.append(view()).find("#layout");

                // Menu control instance
                self.menuControl = new MenuControl($("menu"));

                // Connection indicator
                self.conn_indicatorControl = new Conn_indicatorControl($("header"));

                // Global anti-submit
                self.element.on("submit", "form", $.proxy(self.onsubmit, self));
            },
            /**
             * @name module:layoutControl#onsubmit
             * @description Form submit handler
             * @function
             */
            onsubmit: function (e) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        });
    });