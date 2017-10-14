'use strict';

const Models = require('../models/');

module.exports = (request, reply) => {
    
    Models.Note.findALL({
        order: [['date', 'DESC']]
    }).then((result) => {
        reply({
            data: {
                notes: result
            },
            page: 'Home-Note Board',
            description: 'Welcome to my Notes Board'
        });
    });
};