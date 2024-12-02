const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models').sequelize;

const PathList = sequelize.define('TB_PATH_LISTS', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    path: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: '',
    },
}, {
    timestamps: false,
});

module.exports = PathList;