const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models').sequelize;

const NoticeStatus = sequelize.define('TB_NOTICE_STATUSES', {
    status_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    status: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
}, {
    timestamps: false,
});

module.exports = NoticeStatus;