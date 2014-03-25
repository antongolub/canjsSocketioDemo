/*global require, define, document */

define(["can", "routes/router", 'sortable'],
    /**
     * Application interface class
     * @name Application
     * @requires can {Object} canjs
     * @requires module:router {Function} Router
     * @requires Sortable {Function} Table sorter
     * @see module:router
     * @class Application
     * @constructor
     * @return {Object} Application object
     */
        function (can, Router, Sortable) {
        "use strict";

        return {
            /**
             * Router initialization
             * @name Application#init
             * @description Creates Router control
             * @function
             */
            init: function () {
                can.route.ready(false);
                this.router = new Router(document.body);
                Sortable.init();
            }
        };
    });