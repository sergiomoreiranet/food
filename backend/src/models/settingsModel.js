const Sequelize = require('sequelize');
const database = require('../db');

const settingsModel = database.define('settings', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: Sequelize.STRING,
    name: Sequelize.STRING,
    status: Sequelize.BOOLEAN,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
}, {
    indexes: [{
        unique: true,
        fields: ['email']
    }]
})

module.exports = settingsModel;