/*global require, define */

/**
 * @module menuView
 */

define(['can', 'text!templates/menu.hbs'],
    /**
     * @name module:menuView
     * @constructs
     * @requires can {Object} canjs
     * @requires templates/menu {String} menu.hbs content
     * @returns can.view.mustache {Function} Renderer(data, helpers)
     */
        function (can, template) {
        "use strict";

        return can.view.mustache(template);
    });