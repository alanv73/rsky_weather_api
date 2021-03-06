const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('./sqlize');

const WxMeasurement = sequelize.define('WEATHER_MEASUREMENT', {
    ID: {
        type: DataTypes.BIGINT(20),
        allowNull: false
    },
    AMBIENT_TEMPERATURE: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: false
    },
    GROUND_TEMPERATURE: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: false
    },
    AIR_PRESSURE: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: false
    },
    HUMIDITY: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: false
    },
    WIND_DIRECTION: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: true
    },
    WIND_SPEED: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: false
    },
    WIND_GUST_SPEED: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: false
    },
    WIND_CHILL: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: true
    },
    HEAT_IDX: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: true
    },
    DEW_PT: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: true
    },
    RAINFALL: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: false
    },
    CPU_TEMP: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: false
    },
    CREATED: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
});

module.exports = WxMeasurement;