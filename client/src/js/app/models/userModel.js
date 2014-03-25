/*globals define*/

/**
 * @module userModel
 */

define(['models/defaultModel'],
    /**
     * @name module:userModel
     * @description User RESTful model
     * @see module:defaultModel
     * @class can.Model
     * @constructor
     * @requires module:defaultModel {Function}
     * @returns {Function} Extended can.Model constructor
     */
    function (defaultModel) {
        "use strict";

        return defaultModel('api/users', {
            attributes: {
                name: "string",
                email: "string",
                id: "number"
            },
            init: function () {
                this.validate("email", function (email) {
                    return email && email.length ?
                                (/^([a-zA-Z0-9_.+\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/).test(email) ?
                                    null : "correct email required" :
                                "email required";

                });

                this.validate("name", function (name) {
                    return name && name.length ? null : "name required";
                });
            }
        });
    });
