
/*global require, define, document */

/**
 * @module socketPipe
 */

define(['socketio'],
    /**
     * @name module:socketPipe
     * @description Establishes app socket connection
     * @function
     * @requires io {Function} socket.io
     * @returns {Object} socket pipe
     */
        function (io) {
        "use strict";

        var loc = document.location;
        //return io.connect(loc.protocol + '//' + loc.host);
        return io.connect(loc.protocol + '//' + loc.hostname + ":8000");
    });
