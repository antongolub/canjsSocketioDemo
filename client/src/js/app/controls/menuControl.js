/*global require, define, console, $ */

/**
 * @module menuControl
 */

define(['can', 'views/menuView'],
    /**
     * @name module:menuControl
     * @description Menu render & active section indication
     * @see module:menuView
     * @class can.Control
     * @extends can.Control
     * @constructor
     * @requires can {Object} canjs
     * @requires module:menuView {Function}
     * @returns {Function} can.Control constructor
     */
        function (can, view) {
        'use strict';

        // Constants
        var ACTIVE = "b-menu__li__a--active",
            HIGHLIGHTED = "b-menu__li__a--highlighted";

        return can.Control({
            /**
             * @name module:menuControl#init
             * @description Appends menu view to layout
             * @function
             */
            init: function () {
                var self = this;


                self.element.append(view());

                // Menu items cache
                self.items = $("a");

                // HashChange event listener
                can.route.bind('change', $.proxy(self.onRouteChange, self));
            },
            /**
             * @name module:menuControl#onRouteChange
             * @description Switches menu indication in accordance with the router state
             * @function
             */
            onRouteChange: function (ev, attr, how, newVal) {
                var className = ACTIVE,
                    // menu item selector {jQuery}
                    selector;
                /* istanbul ignore else */
                if (attr === "route") {
                    switch (newVal) {
                    case "users":
                        selector = "[href^='/users']";
                        break;
                    case "users/:id":
                        selector = "[href^='/users']";
                        className = HIGHLIGHTED;
                        break;

                    // Item's being marked "active" as default
                    default:
                        selector = "[href='/']";
                    }
                    this.switchItem(selector, className);
                }
                return selector;
            },
            /**
             * @name module:menuControl#swithItem
             * @param [selector] {String|jQuery} Item selector
             * @param [className] {String} Added className
             * @function
             */
            switchItem: function (selector, className) {

                // Target link {jQuery}
                var self = this,
                    $target = self.items.filter(selector);
                /* istanbul ignore else */
                if (!$target.hasClass(className)) {
                    self.items.removeClass(ACTIVE + " " + HIGHLIGHTED);
                    $target.addClass(className);
                }
            }
        });
    });