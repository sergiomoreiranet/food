const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PWD,
    process.env.DB_USER,
    {
        dialect: process.env.DB_DIALECT,
        host: process.env.DB_HOST
    });

    module.exports = sequelize;