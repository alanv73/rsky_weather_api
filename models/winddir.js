const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('./sqlize');

const WindDir = sequelize.define('hourly_wind_direction_histogram', {
    N: {
        type: DataTypes.DECIMAL(24, 0)
    },
    NNE: {
        type: DataTypes.DECIMAL(23, 0)
    },
    NE: {
        type: DataTypes.DECIMAL(23, 0)
    },
    ENE: {
        type: DataTypes.DECIMAL(23, 0)
    },
    E: {
        type: DataTypes.DECIMAL(23, 0)
    },
    ESE: {
        type: DataTypes.DECIMAL(23, 0)
    },
    SE: {
        type: DataTypes.DECIMAL(23, 0)
    },
    SSE: {
        type: DataTypes.DECIMAL(23, 0)
    },
    S: {
        type: DataTypes.DECIMAL(23, 0)
    },
    SSW: {
        type: DataTypes.DECIMAL(23, 0)
    },
    SW: {
        type: DataTypes.DECIMAL(23, 0)
    },
    WSW: {
        type: DataTypes.DECIMAL(23, 0)
    },
    W: {
        type: DataTypes.DECIMAL(23, 0)
    },
    WNW: {
        type: DataTypes.DECIMAL(23, 0)
    },
    NW: {
        type: DataTypes.DECIMAL(23, 0)
    },
    NNW: {
        type: DataTypes.DECIMAL(23, 0)
    }
});

module.exports = WindDir;