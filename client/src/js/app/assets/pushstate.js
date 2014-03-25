/*global require, define, window, document */

/**
 * @module pushstate
 */

define(function () {
    "use strict";
    /**
     * @name module:pushstate
     * @description Provides pushstate operations
     * @function
     * @param url {String} Pathname
     * @param [title] {String} Document title
     * @param [replace] {Boolean} Switches push & replace methods
     */
    return window.history ?
            function (url, title, replace) {
                window.history[replace ? "replaceState" : "pushState"]({}, title || "", url);
            } :
            /* istanbul ignore next: browser feature required */
            function (url, title) {
                document.location = url;
                document.title = title || "";
            };
});
