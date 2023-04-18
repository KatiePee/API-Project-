'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await queryInterface.bulkInsert(options, reviewsData, {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      // username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {})
  }
};
