const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models').sequelize; // sequelize 인스턴스 임포트

const Authority = sequelize.define('TB_AUTHORITIES', {
    id: {
        type: DataTypes.STRING(8),
        allowNull: false,
        primaryKey: true,
    },
    authority: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: '',
    },
    authority_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    timestamps: false,
});

module.exports = Authority;