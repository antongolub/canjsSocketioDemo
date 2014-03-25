({
    baseUrl: "../",
    appDir: "../src/js/app",
    dir: "../dist/js/app",

    optimize:   "uglify2",
    preserveLicenseComments: false,
    generateSourseMaps: false,

    modules: [
        {
            name: "app/main"
        },
        {
            name: "app/modules/users",
            exclude: ["app/main"]
        }
    ],

    paths: {
        'framework': 'empty:',
        'can': 'empty:',
        'text': 'lib/require/text',
        'socketio': 'empty:',
        'sortable': 'lib/sortable',

        // Assets
        'assets': 'app/assets',
        'socket': 'app/assets/socketPipe',

        'models': 'app/models',
        'views': 'app/views',
        'controls': 'app/controls',
        'routes': 'app/routes',
        'templates': 'app/templates',

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
})