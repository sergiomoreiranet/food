'use strict';
const bcrypt = require('bcryptjs');
require('dotenv').config();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const settingsId = await queryInterface.rawSelect('settings', { where: {}, limit: 1 }, ['id']);
    if (!settingsId) {
      return queryInterface.bulkInsert('settings', [{
        email: process.env.DEFAULT_SETTINGS_EMAIL,
        password: bcrypt.hashSync(process.env.DEFAULT_SETTINGS_PWD),
        phone: process.env.DEFAULT_SETTINGS_PHONE,
        name: process.env.DEFAULT_SETTINGS_NAME,
        status: process.env.DEFAULT_SETTINGS_STATUS,
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
    }
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('settings', null, {});
  }
};
