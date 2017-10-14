'use strict';

const Models = require('../models/');
const Slugfy = require('slug');
const Path = require('path');

module.exports = {
    // All functions that will handle each request in the routes

    // CRUD
    create: (request, reply) => {
        Models.Note.create({
            date: new Date(),
            title: request.payload.noteTitle,
            slug: Slugfy(request.payload.noteTitle, {lower: true}),
            description: request.payload.noteDescription,
            content: request.payload.noteContent
        }).then((result) => {
            // a view will be generate later
            reply(result);
        });
    },

    read: (request, reply) => {
        Models.Note.findOne({
            where: {
                slug: request.params.slug
            }
        })
        .then((result) => {
            reply(result);
        });
    },

    update: (request, reply) => {
        const values = {
            title: request.payload.noteTitle,
            description: request.payload.noteDescription,
            content: request.payload.noteContent
        };

        const options = {
            where: {
                slug: request.params.slug
            }
        };

        Models.Note
        .update(values, options)
        .then(() => {
            Models.Note.findOne(options).then((result) => {
                reply(result);
            });
        });
    },

    delete: (request, reply) => {
        Models.Note.destroy({
            where: {
                slug: request.params.slug
            }
        }).then(() => reply.redirect('/'));
    }
};