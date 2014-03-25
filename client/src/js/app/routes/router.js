/*global require, define, $, console */

/**
 * @module router
 */

define([
    "can",
    "controls/layoutControl",
    "controls/rootControl"
],
    /**
     * @name module:router
     * @description Main application router: route map & controls initialization
     * @see module:layoutControl
     * @see module:routerControl
     * @requires can {Object} canjs
     * @requires module:layoutControl {Function} Layout control
     * @requires module:routerControl {Function} Root control
     * @class can.Control
     * @extends can.Control
     * @constructor
     * @returns {Function} can.Control constructor
     */
        function (can, LayoutControl, RootControl) {
        "use strict";

        return can.Control({
            /**
             * @name module:router#init
             * @description Creates application route map
             * @function
             */
            init: function () {
                var self = this;

                // Layout control instance
                self.controls.layoutControl = new LayoutControl($("body"));

                // Main block. Controllers are attached here
                self.$main = $("main");

                // Root view control
                self.controls.rootControl = new RootControl(self.$main);

                can.route("/");
                can.route("users");
                can.route("users/:id");
                can.route.ready();

            },
            /**
             * @name module:router#controls
             * @description Initialized controls
             * @type Object
             * @field
             */
            controls: {},
            activeControl: null,
            switchControl: function (control, data) {
                if (control && control !== this.activeControl) {
                    if (this.activeControl) {
                        this.activeControl.hide();
                    }
                    this.activeControl = control;
                    control.show(data);
                }
            },
            /**
             * @name module:router#loadControl
             * @description Load aggregated module (control)
             * @function
             * @param modulePath {String} Relative or absolute path
             * @param controlPath {String} Path
             * @param [fn] {Function} Optional callback
             * @param [data] {Function} Route data
             */
            loadControl: function (modulePath, controlPath, fn, data) {
                var Control = this.controls[controlPath],
                    self = this;

                // Check if module is loaded
                if (!Control) {
                    require([modulePath], function () {
                        require([controlPath], function (Control) {

                            // Target control initialization
                            self.controls[controlPath] = Control = new Control(self.$main);

                            if ($.isFunction(fn)) {
                                fn(Control, data);
                            }
                        });
                    });
                } else if ($.isFunction(fn)) {
                    fn(Control, data);
                }
            },
            /**
             * @name module:router#root route
             * @description Root route handler
             * @function
             */
            "/ route": function () {
                var self = this;
                self.switchControl(self.controls.rootControl);
            },
            /**
             * @name module:router#users route
             * @description Users (list) route handler
             * @function
             * @param data {String} Query data params
             */
            "users route": function (data) {
                this.loadControl("modules/users", "controls/user/userListControl", $.proxy(this.switchControl, this), data);
            },
            /**
             * @name module:router#users/:id route
             * @description Users/id route handler
             * @function
             * @param data {String} Query data params
             */
            "users/:id route": function (data) {
                this.loadControl("modules/users", "controls/user/userControl", $.proxy(this.switchControl, this), data);
            }
        });
    });