'use strict';

const Models = require('./lib/models');
const Routes = require('./lib/routes');
const Hapi = require('hapi');
const Hoek = require('hoek');
const Settings = require('./settings');

const Server = new Hapi.Server();
Server.connection({port: Settings.port});

Server.route(Routes);

Models.sequelize.sync().then(() => {
    Server.start((err) => {
        Hoek.assert(!err, err);
    
        console.log(`Server running at: ${Server.info.uri}`);
    });
});

