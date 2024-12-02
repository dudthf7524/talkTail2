const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models').sequelize;

const LogLogin = sequelize.define('TB_LOG_LOGINS', {
    login_log_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    platform_id: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    platform: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    user_ip: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '0.0.0.0',
    },
    last_login_time: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
        onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
}, {
    timestamps: false,
});

module.exports = LogLogin;