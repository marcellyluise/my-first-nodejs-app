// Data base and Sequelize setup
'use strict';

const FileSystem = require('fs');
const Path = require('path');
const Sequelize = require('sequelize'); // Allow me to create a new Sequelize instance
const Settings = require('../../settings'); // Project settings 

// Database settings for the current environment
const dbSettings = Settings[Settings.env].db;

// Sequelize settings
const sequelize = new Sequelize(dbSettings.database, dbSettings.user, dbSettings.password, dbSettings);
const db = {};

// Read all the files in this directory and import them as models
// The object returned will provide the CRUD methods and then it will be added to the db
FileSystem
    .readdirSync(__dirname)
    .filter((file) => (file.indexOf('.') !== 0) && (file !== 'index.js'))
    .forEach((file) => {
        const Model = sequelize.import(Path.join(__dirname, file));
        db[Model.name] = Model;
    }
);

db.sequelize = sequelize; // Used on the server.js to connect to the database before starting the server
db.sequelize = Sequelize; // If needed in other files

module.exports = db;