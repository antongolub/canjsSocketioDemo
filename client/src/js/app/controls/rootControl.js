/*global require, define, $, console */

/**
 * @module rootComponent
 */

define([
    'can',
    'controls/defaultControl',
    'text!templates/root.hbs'
],
    /**
     * @name module:rootComponent
     * @description Root page component
     * @class can.Control
     * @extends can.Control
     * @see module:defaultControl
     * @constructor
     * @requires can {Object} canjs
     * @requires module:defaultControl {Function}
     * @requires templates/root {String} Root Template
     * @returns can.Control {Function} constructor
     */
        function (can, defaultControl, template) {
        "use strict";

        return defaultControl.extend({
            init: function () {

                var self = this;

                self.element = self.element
                    .append(can.view.mustache(template)())
                    .find("#root");
                // There's no activeControl on app start, so we have to force .hide() manually
                self.hide();
            }
        });
    });
