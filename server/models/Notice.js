const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models').sequelize;
const Pet = require('./Pet');
const Reservation = require('./Reservation');
const NoticeStatusOfPart = require('./NoticeStatusOfPart');

const Notice = sequelize.define('TB_NOTICES', {
    notice_id: {
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
    reservation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    pet_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    etc_note: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '',
    },
    review_write: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    timestamps: false,
});

module.exports = Notice;