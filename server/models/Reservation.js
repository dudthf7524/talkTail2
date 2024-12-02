const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models').sequelize;
const Pet = require('./Pet');

const Reservation = sequelize.define('TB_RESERVATIONS', {
    reservation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    pet_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    platform_id: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    platform: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    attention_note: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '',
    },
    total_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    noshow_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    reservation_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: '2000-01-01',
    },
    reservation_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: '00:00:00',
    },
    is_reservation: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    timestamps: false,
});

module.exports = Reservation;