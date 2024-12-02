const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models').sequelize;
const NoticePart = require('./NoticePart');
const NoticeStatus = require('./NoticeStatus');
const Reservation = require('./Reservation');

const NoticeStatusOfPart = sequelize.define('TB_NOTICE_STATUS_OF_PARTS', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    part_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    reservation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
});

module.exports = NoticeStatusOfPart;