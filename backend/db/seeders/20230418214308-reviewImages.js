'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const reviewImagesData = [
  {
    reviewId: 1,
    url: 'review 1 image - Karen reviews Millies purrfect cat tree',
  },
  {
    reviewId: 3,
    url: 'review 3 image - harrison reviews stud rock castle',
  },
  {
    reviewId: 4,
    url: 'review 4 image - katie reviews Millies purrfect cat tree',
  },
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    await queryInterface.bulkInsert(options, reviewImagesData, {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      // username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {})
  }
};
