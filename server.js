'use strict';

const Models = require('./lib/models');
const Routes = require('./lib/routes');
const Hapi = require('hapi');
const Hoek = require('hoek');
const Settings = require('./settings');
const Path = require('path');

const Server = new Hapi.Server();
Server.connection({port: Settings.port});

Server.register([
    require('vision'),
    require('inert')
], (err) => {
    Hoek.assert(!err, err);

    Server.views({
        engines: {pug: require('pug')},
        path: Path.join(__dirname, 'lib/views'),
        compileOptions: {
            pretty: false
        },

        isCached: Settings.env === 'production'
    });

    Server.route(Routes);
});

Models.sequelize.sync().then(() => {
    Server.start((err) => {
        Hoek.assert(!err, err);
    
        console.log(`Server running at: ${Server.info.uri}`);
    });
});