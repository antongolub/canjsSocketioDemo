/*global require, define, $, console */

/**
 * @module conn_indicatorControl
 */

define([
    'can',
    'text!templates/conn_indicator.hbs',
    'socket'
],
    /**
     * @name module:conn_indicatorControl
     * @description Connection indicator
     * @class can.Control
     * @extends can.Control
     * @constructor
     * @requires can {Object} canjs
     * @requires 'templates/conn_indicator' {String} Conn indicator mustache template
     * @requires socket {Object} Socket pipe
     * @returns  {Function} can.Control constructor
     */
        function (can, template, socket) {
        "use strict";

        var SELECTOR = ".b-conn_indicator",
            ACTIVE = "b-conn_indicator--online";

        return can.Control.extend({
            init: function () {

                var self = this;

                // Render
                self.element = self.element
                    .prepend(can.view.mustache(template)())
                    .find(SELECTOR);

                /* istanbul ignore next */
                if (socket.socket.connected) {
                    self.onconnect();
                }

                // Socket events listeners
                socket.on('connect', $.proxy(self.onconnect, self));
                socket.on('reconnect', $.proxy(self.onconnect, self));

                socket.on('reconnect_failed', $.proxy(self.ondisconnect, self));
                socket.on('connect_failed', $.proxy(self.ondisconnect, self));
                socket.on('disconnect', $.proxy(self.ondisconnect, self));
            },
            /**
             * @name module:conn_indicatorControl#switchState
             * @description Switches online/offline state
             * @param [state] {Boolean} State
             * @function
             */
            switchState: function (state) {
                var self = this;
                self.element.toggleClass(ACTIVE, !!state);
            },
            /**
             * @name module:conn_indicatorControl#ondisconnect
             * @description Socket disconnect handler
             * @function
             */
            ondisconnect: function () {
                this.switchState();
            },
            /**
             * @name module:conn_indicatorControl#onconnect
             * @description Socket connect handler
             * @function
             */
            onconnect: function () {
                this.switchState(true);
            }
        });
    });
