/*jslint nomen: true */
/*globals require, define, $, console, document*/

/**
 * @module defaultModel
 */

define(['can', 'socket'],
    function (can, socket) {
        "use strict";
        /**
         * @name module:defaultModel
         * @description Socket.io-wrapped can.Model
         * @extends can.Model
         * @requires can
         * @requires socket
         * @see module:socketPipe
         * @function
         * @param [path] {String} API-path. If empty returns can.Model as is
         * @returns {Function} can.Model constructor
         */
        return function (path, ext) {
            var Model;

            if (typeof path === 'string') {
                Model = can.Model.extend(ext, {
                    /**
                     * @name module:defaultModel#create
                     * @description Create method via socket.io
                     * @param [data] {Object} data
                     * @function
                     */
                    create: function (data) {
                        var def = can.Deferred(), self = this;
                        socket.emit(path + "::create", $.extend({}, self._data, data), {},
                            function (err, resp) {
                                self.attr(resp);
                                def.resolve(resp);
                            });
                        return def;
                    },
                    /**
                     * @name module:defaultModel#findOne
                     * @description Fetches single model by id via socket.io
                     * @param id {Number} Id
                     * @param [data] {Object}
                     * @function
                     */
                    findOne: function (id, data) {
                        var def = can.Deferred(), self = this;
                        socket.emit(path + "::get", id, data,
                            function (err, resp) {
                                self.attr(resp);
                                def.resolve(resp);
                            });
                        return def;
                    },
                    /**
                     * @name module:defaultModel#findAll
                     * @description Fetches collection via socket.io
                     * @param [query] {Object} Filter options
                     * @function
                     */
                    findAll: function (query) {
                        var def = can.Deferred(),
                            self = this;
                        socket.emit(path + "::find", query,
                            function (err, resp) {
                                self.attr("list", resp);
                                def.resolve(resp);
                            });
                        return def;
                    },
                    /**
                     * @name module:defaultModel#update
                     * @description It saves model changes or creates a new one (upsert) via socket.io
                     * @param id {Number} Id
                     * @param [data] {Object}
                     * @function
                     */
                    update: function (id, data) {
                        var def = can.Deferred(), self = this;

                        socket.emit(path + '::update', id || self._data.id, $.extend({}, self._data, data), {},
                            function (e, resp) {
                                //NB def reject behavior
                                self.attr(resp);
                                def.resolve(resp);
                            });

                        return def;
                    },
                    /**
                     * @name module:defaultModel#destroy
                     * @description Destroys model via socket.io
                     * @param id {Number} Id
                     * @function
                     */
                    destroy: function (id) {
                        var def = can.Deferred(), self = this;

                        socket.emit(path + '::remove', id || self._data.id, {},
                            function (e, resp) {
                                def.resolve(resp);
                            });

                        return def;
                    }
                });



                // Server events listeners
                socket.on(path + ' updated', function (data) {
                    can.trigger(Model, "updated", data);
                });
                socket.on(path + ' created', function (data) {
                    can.trigger(Model, "created", data);
                });
                socket.on(path + ' removed', function (data) {
                    can.trigger(Model, "destroyed", data);
                });
            } else {
                Model = can.Model;
            }
            return Model;
        };
    });
