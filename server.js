'use strict';

const Routes = require('./lib/routes');
const Hapi = require('hapi');
const Hoek = require('hoek');
const Settings = require('./settings');

const Server = new Hapi.Server();
Server.connection({port: Settings.port});

Server.route(Routes);

Server.start((err) => {
    Hoek.assert(!err, err);

    console.log(`Server running at: ${Server.info.uri}`);
});