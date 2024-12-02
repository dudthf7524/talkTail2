const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('.').sequelize;

const ReservationStatus = sequelize.define('ReservationStatus', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    reservation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    option_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
});

module.exports = ReservationStatus;