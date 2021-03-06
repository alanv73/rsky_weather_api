require('dotenv').config();
const { Sequelize, Model, DataTypes } = require('sequelize');
const DBUSER = process.env.DBUSER;
const DBPW = process.env.DBPASSWORD;
const DBHOST = process.env.DBHOST;

// RPi
const sequelize = new Sequelize('weather', DBUSER, DBPW, {
    host: DBHOST,
    port: 3306,
    dialect: 'mariadb',
    dialectOptions: {
        timezone: 'Etc/GMT+5'
    },
    logging: false,
    timezone: 'Etc/GMT+5',
    define: {
        freezeTableName: true
    },
    pool: {
        handleDisconnects: true,
        max: 13,
        min: 1,
        idle: 10000,
        acquire: 20000 // ms
    }
});

module.exports = sequelize;