/*jslint nomen: true */
/*globals require, __dirname, console, process*/

(function () {
    "use strict";
    var DEVMODE = process.env.NODE_ENV === "DEVELOPMENT",
        feathers = require('feathers'),
        request = require('request'),
        handlebars = require('express3-handlebars'),
        path = require('path'),
        _ = require('lodash'),


        clientPath =  path.join(__dirname, '../', DEVMODE ? 'client/src' : 'client/dist'),
        docsPath = path.join(__dirname, '../', 'client/docs'),
        templatesPath = clientPath + "/js/app/templates",

        // default userlist
        users = [
            {id: 1, name: "user1", email: "user1.email@domain.com"},
            {id: 2, name: "Foo Bar Jr.", email: "foobar@example.com"},
            {id: 3, name: "John Doe", email: "john.doe@gmail.com"},
            {id: 7, name: "Abc Def", email: "abc@def.gh"}
        ],
        nextId = 1 + (users.length ? _.max(users, function (u) { return u.id; }).id : 0),

        // Basic socket service
        myService = {
            find: function (params, callback) {

                if (callback) {
                    callback(null, users);
                }

            },
            get: function (id, params, callback) {

                var resp = _.find(users, function (obj) {
                    return obj.id === +id;
                });

                callback(null, resp);

            },
            create: function (data, params, callback) {
                var id = nextId,
                    newOne = _.extend(data, {
                        id: id
                    });
                nextId += 1;
                users.push(newOne);
                callback(null, newOne);

                // Test DB limit
                if (users.length > 100) {
                    users.shift();
                    feathers.socketio.broadcast.emit('api/users updated', users);
                }
            },
            // upsert
            update: function (id, data, params, callback) {
                var i;
                if (id) {
                    i = _.findIndex(users, function (obj) {
                        return obj.id === +id;
                    });
                    if (i < 0) {
                        users.push(data);
                    } else {
                        users[i] = data;
                    }
                    callback(null, data);
                } else {
                    myService.create(data, params, callback);
                }
            },
            remove: function (id, params, callback) {
                var i;
                if (id) {
                    i = _.findIndex(users, function (obj) {
                        return obj.id === +id;
                    });
                    if (i > -1) {
                        users.splice(i, 1);
                    }
                    callback(null, id);
                }
            },
            setup: function (app) {}
        },
        app = feathers();









    app.configure(function () {
        app.use(feathers.compress());
        app.engine('hbs', handlebars({
            extname:        ".hbs",
            layoutsDir:     templatesPath,
            partialsDir:    templatesPath,
            cache:          true
        }));
        app.set("views", templatesPath);
        app.set("view options", { layout: false});
        app.set('view engine', 'hbs');

    });


    app.get(/^(\/|\/users|\/users\/\w+)\/*$/i, function (req, res) {


        res.render('index', {
            url: req.url || ""
        });

    });
    app.use('/docs', feathers["static"](docsPath));
    app.use('/', feathers["static"](clientPath));

    app
        .configure(feathers.socketio(function (io) {

            io.enable('browser client minification');  // send minified client
            io.enable('browser client etag');          // apply etag caching logic based on version number
            io.enable('browser client gzip');          // gzip the file
            io.set('log level', 1);                    // reduce logging

            // enable all transports (optional if you want flashsocket support, please note that some hosting
            // providers do not allow you to create servers that listen on a port different than 80 or their
            // default port)
            io.set('transports', [
                'websocket',
                'flashsocket',
                'htmlfile',
                'xhr-polling',
                'jsonp-polling'
            ]);
            io.set('polling duration', 4);
            io.set('heartbeat interval', 4);
            io.set('heartbeat timeout', 8);
            io.sockets.on('connection', function (socket) {
                socket.emit('api/users updated', users);
            });
        }))
        .use('/api/users', myService)
        .listen(8000);

}());


