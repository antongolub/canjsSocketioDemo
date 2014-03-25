/*global require, define, $, console */

/**
 * @module defaultControl
 */
define(['can'],
    /**
     * @name module:defaultControl
     * @description Default control component. Common methods & behavior
     * @class can.Control
     * @extends can.Control
     * @constructor
     * @requires can {Object} canjs
     * @returns can.Control {Function} constructor
     */
        function (can) {
        "use strict";

        return can.Control.extend({
            /**
             * @name module:defaultControl#showError
             * @description Assigned model error indication
             * @param [name] {String} Property name
             * @function
             */
            showError: function (name) {
                var self = this, err;
                name = name.toString();
                /* istanbul ignore else */
                if (name && self.model && self.model.errors) {
                    err = self.model.errors(name);
                    // NB Zepto cannot attach [Array] to DOM so we need use .toString() additionally
                    self.element.find("[data-error=" + name + "]").html(err ? err[name].toString() : "");
                }
                return err;
                /** There's no handler for null-error event in model, so we have to use onchange bind
                 self.model.bind("error", function (ev, attr, errors) {
                    self.element.find("[data-error=" + attr + "]").html(errors[attr]);
                });
                 */
            },
            /**
             * @name module:defaultControl#hide
             * @description Hides control
             * @function
             */
            hide: function () {
                var self = this;
                self.element.hide();
            },
            /**
             * @name module:defaultControl#show
             * @description Shows control
             * @function
             */
            show: function () {
                var self = this;
                self.element.show();
            }
        });
    });