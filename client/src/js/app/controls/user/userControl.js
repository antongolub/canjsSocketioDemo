/*global require, define, $, console */
/*jslint nomen: true, todo: true */

/**
 * @module userControl
 */

define([
    'can',
    'controls/defaultControl',
    'text!templates/user/user.hbs',
    'models/userModel',
    'assets/pushstate'
],
    /**
     * @name module:userControl
     * @description User component
     * @see module:userModel
     * @see module:defaultControl
     * @class can.Control
     * @extends can.Control
     * @constructor
     * @requires can {Object} canjs
     * @requires module:defaultControl {Function}
     * @requires templates/user/user {handlebars|mustache}
     * @requires module:userModel {Function}
     * @requires pushstate {Function}
     * @returns {Function} can.Control constructor
     */
        function (can, defaultControl, template, Model, pushstate) {
        "use strict";

        // CSS classes
        var ERROR = "b-section--error",
            NEW = "b-section--new";

        return defaultControl.extend({
            /**
             * @name module:userControl#init
             * @description Render & model bindings
             * @see module:userModel
             * @function
             */
            init: function () {

                var self = this;

                // User template renderer
                can.view.mustache("userHbs", template);

                can.view('userHbs', self.model, function (frag) {
                    self.element = self.element.append(frag).find("#user");

                    self.$formElements = self.element.find("input, select, textarea");
                    self.$error = self.element.find(".controlError");

                    self.element.on("click", "#save, #add", $.proxy(self.save, self));
                    self.element.on("click", "#remove", $.proxy(self.remove, self));
                });
                self.model.bind("change", $.proxy(self.onModelChange, self));

            },

            /**
             * @name module:userControl#model
             * @description Model instance
             * @see module:userModel
             * @type can.Model
             * @field
             */
            model: new Model(),
            /**
             * @name module:userControl#fetch
             * @description Triggers view state update
             * @param data {Object} Route change event data
             * @function
             */
            fetch: function (data) {
                var self = this, def;
                self.id = (data || /* istanbul ignore next: lazy bastard */ {}).id;
                /* istanbul ignore else */
                if (self.id) {
                    def = self.model.findOne(data.id).done($.proxy(self.onModelUpdate, self));
                }
                return def;
            },
            /**
             * @name module:userControl#save
             * @description Validates & saves model via .model.update()
             * @function
             */
            save: function () {
                var self = this, err;
                self.$formElements.trigger("change");
                err = self.model.errors();

                return !!err ? err : self.model.update().done($.proxy(self.onModelSave, self));
            },
            /**
             * @name module:userControl#remove
             * @description Destroys model via .model.destroy() method and then redirects to /users/ path
             * @function
             */
            remove: function () {
                var self = this;
                pushstate("/users", "Users", true);
                return self.model.destroy();
            },
            /**
             * @name module:userControl#toggleViewMode
             * @description Switches control visual states: default, new, error
             * @param [res] {Object} Model data fragment
             * @function
             */
            toggleViewMode: function (res) {
                var self = this,
                    err,
                    isNew = self.id === 'new';

                self.element.toggleClass(NEW, isNew);
                if (isNew) {
                    self.model.attr("id", null);
                    self.$formElements.val("");
                    self.id = null;

                } else {
                    /* istanbul ignore else */

                    if (!res) {
                        // TODO We need to create error indication control, with its own render method
                        err = "User {id:" + self.id + "} not found";
                        self.$error.html(err);
                    }
                }
                self.element.toggleClass(ERROR, !!err);
            },
            /**
             * @name module:userControl#onModelChange
             * @description Model change handler. Triggers validation error indicator
             * @see model:defaultControl#showError
             * @param obj {Object} Model
             * @param name {String} Changed field {attr} name
             * @function
             */
            onModelChange: function (obj, name) {
                // Error indication
                return this.showError(name);
            },
            /**
             * @name module:userControl#onModelSave
             * @description Model save callback. Switches view state if necessary
             * @param res {Object} Model data
             * @function
             */
            onModelSave: function (res) {
                can.route.attr('id', res.id);
                this.element.removeClass(NEW);
            },
            /**
             * @name module:userControl#onModelUpdate
             * @description Model update callback. Switches view state if necessary
             * @param res {Object} Model data
             * @function
             */
            onModelUpdate: function (res) {
                this.toggleViewMode(res);
            },
            /**
             * @name module:userControl#show
             * @description Shows actual view
             * @param data {Object} Route data
             * @function
             */
            show: function (data) {
                var self = this;

                self.element.show();
                // Model fetch by route's id param
                self.fetch(data);
            }
        });
    });