/*globals require*/


// load all files with filename before extension ending in "Test" as tests
var tests = [];
for (var file in window.__karma__.files) {
    if (/Test\.js$/.test(file)) {
        tests.push(file);
    }
}
console.log('Tests to be started:', tests);
require.config({
    // Karma serves files from '/base'
    baseUrl: '/base',

    paths: {
        // Library & plugins
        'framework':    'src/js/lib/zepto.min',
        'can':          'src/js/lib/can/can.zepto',

        'text':         'src/js/lib/require/text',
        'socketio':     'src/js/lib/socket.io.min',
        'sortable':     'src/js/lib/sortable',

        // Assets
        'assets':       'src/js/app/assets',
        'socket':       'src/js/app/assets/socketPipe',

        // Basic module paths
        'models':       'src/js/app/models',
        'views':        'src/js/app/views',
        'controls':     'src/js/app/controls',
        'routes':       'src/js/app/routes',
        'templates':    'src/js/app/templates',

        // Aggregated module path
        'modules':      'src/js/app/modules',// aggregated controls with its dependencies

        // App instance
        'App':          'src/js/app/app'
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
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});
