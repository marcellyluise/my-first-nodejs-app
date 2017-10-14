'use strict';

module.exports = [
    {
        method: 'GET',
        path: '/', // Home
        handler: (request, reply) => {
            reply('All the notes will appear here');
        },

        config: {
            description: 'Gets all the notes available'
        }
    },

    {
        method: 'POST',
        path: '/note',
        handler: (request, reply) => {
            reply('New note');
        },

        config: {
            description: 'Adds a new note'
        }
    },

    {
        method: 'GET',
        path: '/note/{slug}',
        handler: (request, reply) => {
            reply('This is a note');
        },

        config : {
            description: 'Gets the content of a note'
        }
    },

    {
        method: 'PUT',
        path: '/note/{slug}',
        handler: (request, reply) => {
            reply('Edit a note');
        },

        config: {
            description: 'Updates the selected note'
        }
    },

    {
        method: 'GET',
        path: '/note/{slug}/delete', // Delete will be called just by visiting the corresponding URL. In a strict REST interface, should use DELETE method
        handler: (request, reply) => {
            reply('This note no longer exists');
        },

        config: {
            description: 'Deletes the seleected note'
        }
    }


];