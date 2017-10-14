'use strict';

const Hapi = require('hapi');
const Hoek = require('hoek');
const Settings = require('./settings');

const Server = new Hapi.Server();
Server.connection({port: Settings.port});

Server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
        reply('Hello ello llo loo!');
    }
});

Server.start((err) => {
    Hoek.assert(!err, err);

    console.log(`Server running at: ${Server.info.uri}`);
});