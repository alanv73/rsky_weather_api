const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./sqlize');

const HourlySummary = sequelize.define('WEATHER_AVG_BY_HOUR', {
    CREATED: {
        type: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
        primaryKey: true
    },
    CREATED_DATE: {
        type: DataTypes.DATE,
        allowNull: true
    },
    CREATED_HOUR: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    AVG_AMBIENT_TEMPERATURE: {
        type: DataTypes.DECIMAL(7, 2),
        allowNull: true
    },
    MIN_AMBIENT_TEMPERATURE: {
        type: DataTypes.DECIMAL(7, 2),
        allowNull: true
    },
    MAX_AMBIENT_TEMPERATURE: {
        type: DataTypes.DECIMAL(7, 2),
        allowNull: true
    },
    AVG_GROUND_TEMPERATURE: {
        type: DataTypes.DECIMAL(7, 2),
        allowNull: true
    },
    MIN_GROUND_TEMPERATURE: {
        type: DataTypes.DECIMAL(7, 2),
        allowNull: true
    },
    MAX_GROUND_TEMPERATURE: {
        type: DataTypes.DECIMAL(7, 2),
        allowNull: true
    },
    AVG_AIR_PRESSURE: {
        type: DataTypes.DECIMAL(7, 2),
        allowNull: true
    },
    AVG_HUMIDITY: {
        type: DataTypes.DECIMAL(7, 2),
        allowNull: true
    },
    AVG_WIND_DIRECTION: {
        type: DataTypes.DECIMAL(7, 2),
        allowNull: true
    },
    AVG_WIND_SPEED: {
        type: DataTypes.DECIMAL(7, 2),
        allowNull: true
    },
    MAX_WIND_GUST_SPEED: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: true
    },
    AVG_WIND_CHILL: {
        type: DataTypes.DECIMAL(7, 2),
        allowNull: true
    },
    MIN_WIND_CHILL: {
        type: DataTypes.DECIMAL(7, 2),
        allowNull: true
    },
    AVG_HEAT_IDX: {
        type: DataTypes.DECIMAL(7, 2),
        allowNull: true
    },
    MAX_HEAT_IDX: {
        type: DataTypes.DECIMAL(7, 2),
        allowNull: true
    },
    AVG_DEW_PT: {
        type: DataTypes.DECIMAL(7, 2),
        allowNull: true
    },
    MIN_DEW_PT: {
        type: DataTypes.DECIMAL(7, 2),
        allowNull: true
    },
    MAX_DEW_PT: {
        type: DataTypes.DECIMAL(7, 2),
        allowNull: true
    },
    TOTAL_RAINFALL: {
        type: DataTypes.DECIMAL(28, 2),
        allowNull: false
    },
    MAX_CPU_TEMP: {
        type: DataTypes.DECIMAL(7, 2),
        allowNull: false
    }
}, 
{
    timestamps: false
});

module.exports = HourlySummary;