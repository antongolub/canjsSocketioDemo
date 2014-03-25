/*global require, define, document, window */

/**
 * @name Canjs + socket.io demo
 * @description Main app file: config & initialization
 * @author Anton Golub <mailbox@antongolub.ru>
 * @copyright 2014
 * @license MIT
 * @version 0.0.1
 * @class main
 */
(function () {
    "use strict";

    // Provides feature detection to load zepto/jquery respectively
    var modern = document.querySelector &&
        window.localStorage &&
        window.addEventListener;

    // Requirejs config
    require.config({
        app_name: "App",
        baseUrl: 'js/',

        paths: {
            // Library & plugins
            'framework': modern ?
                    ['//cdn.jsdelivr.net/zepto/1.1.3/zepto.min','lib/zepto.min'] :
                    ['//cdn.jsdelivr.net/jquery/1.10.2/jquery.min','lib/jquery/jquery-1.10.2.min'],
            'can': modern ?
                    ['lib/can/can.zepto'] :
                    ['lib/can/can.jquery'],

            'text': 'lib/require/text',
            'socketio': ['//cdnjs.cloudflare.com/ajax/libs/socket.io/0.9.16/socket.io.min','lib/socket.io.min'],
            'sortable': 'lib/sortable',

            // Assets
            'assets': 'app/assets',
            'socket': 'app/assets/socketPipe',

            // Basic module paths
            'models': 'app/models',
            'views': 'app/views',
            'controls': 'app/controls',
            'routes': 'app/routes',
            'templates': 'app/templates',

            // Aggregated module path
            'modules': 'app/modules',

            // App instance
            'App': 'app/app'
        },

        shim: {
            'sicketio': {
                exports: 'io'
            },
            'can': {
                deps: ['framework'],
                exports: 'can'
            },
            'sortable': {
                exports: 'Sortable'
            }
        }
    });

    // Application starting point
    require(["App"], function (App) {
        App.init();
    });

}());

