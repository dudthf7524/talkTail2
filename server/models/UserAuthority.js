const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models').sequelize;
const User = require('./User');
const Authority = require('./Authority');

const UserAuthority = sequelize.define('TB_USER_AUTHS', {
    id: {
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
    authority_id: {
        type: DataTypes.STRING(8),
        allowNull: false,
        unique: true,
    },
}, {
    timestamps: false,
});

module.exports = UserAuthority;
