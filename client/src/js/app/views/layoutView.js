/*global require, define */

/**
 * @module layoutView
 */

define(['can', 'text!templates/layout.hbs'],
    /**
     * @name module:layoutView
     * @constructs
     * @requires can {Object} canjs
     * @requires templates/layout {String}
     * @returns {Function} can.view.mustache-renderer(data, helpers)
     */
        function (can, template) {
        "use strict";

        return can.view.mustache(template);
    });