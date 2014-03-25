/*global require, define, $, console */
/*jslint todo: true */

/**
 * @module userListControl
 */

define([
    'can',
    'controls/defaultControl',
    'text!templates/user/userlist.hbs',
    'models/userModel',
    'sortable'
],
    /**
     * @name module:userListControl
     * @description Userlist component
     * @see module:userModel
     * @see module:defaultControl
     * @class can.Control
     * @extends can.Control
     * @constructor
     * @requires can {Object} canjs
     * @requires defaultControl {Function} constructor
     * @requires templates/user/userlist {handlebars|mustache} userlist template
     * @requires userModel {Function}
     * @requires Sortable {Function} Table sorter
     * @returns can.Control {Function} constructor
     */

        function (can, defaultControl, template, model, Sortable) {
        "use strict";

        return defaultControl.extend({

            /**
             * @name module:userListControl#model
             * @description Model instance
             * @type can.Model
             * @field
             */
            model: model(),
            /**
             * @name module:userListControl#init
             * @description Control initialization, model events bindings, userlist render
             * @see module:userModel
             * @function
             */
            init: function () {
                // Context
                var self = this,
                    TABLE = ".b-table",
                    // "Remove btn" classname
                    CROSS = '.b-table__td--cross';

                can.view.mustache("userlistHbs", template);
                can.view('userlistHbs', self.model, function (frag) {

                    // {jquery} Parent node declaration
                    self.element = self.element.append(frag).find("#userlist");

                    self.table = self.element.find(TABLE);
                    self.table.on("click", CROSS, $.proxy(self.onRemoveClick, self));

                    // Tiny simple table sorter
                    // TODO: Finally should be replaced with model methods
                    Sortable.initTable(self.table.get(0));

                });


                // Model event handlers: userlist auto-update
                model.bind("created", $.proxy(self.fetch, this));
                model.bind("destroyed", $.proxy(self.fetch, this));
                model.bind("updated", $.proxy(self.fetch, this));


                // Go!
                this.fetch();
            },
            /**
             * @name module:userListControl#onRemoveClick
             * @description "Remove btn" click handler
             * @param e {$.Event}
             * @function
             */
            onRemoveClick: function (e) {
                return this.remove(e.target);
            },
            /**
             * @name module:userListControl#remove
             * @description Remove action: table line annihilation & .model.destroy()
             * @param node {domElement} event.target
             * @function
             */
            remove: function (node) {
                var self = this,
                    $node = $(node),
                    id = $node.attr("data-id");
                /* istanbul ignore else */
                if (id) {
                    $node.parent().remove();
                    return self.model.destroy(id);
                }
                return id;
            },

            /**
             * @name module:userListControl#fetch
             * @description Updates the view after server-side events
             * @function
             */
            fetch: function () {
                var self = this;

                return self.model.findAll().then(
                    function () {
                        /* istanbul ignore else */
                        if (self.table) {
                            self.table.find("th[data-sorted-direction]")
                                .attr("data-sorted", "")
                                .trigger('click');
                        }
                    }
                );
            }
        });
    });