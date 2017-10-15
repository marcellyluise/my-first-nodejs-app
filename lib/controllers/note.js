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
            // Generate a new note with 'result' data
            const newNote = Pug.renderFile(
                Path.join(__dirname, '../views/components/note.pug'),
                {
                    note: result
                }
            );

            reply(newNote);
        });
    },

    read: (request, reply) => {
        Models.Note.findOne({
            where: {
                slug: request.params.slug
            }
        })
        .then((result) => {
            reply.view('note', {
                note: result,
                page: `${result.title}-Notes Boards`,
                description: result.description
            });
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
                const updatedNote = Pug.renderFile(
                    Path.join(__dirname, '../views/components/note.pug'),
                    {
                        note: result
                    }
                );

                reply(updatedNote);
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