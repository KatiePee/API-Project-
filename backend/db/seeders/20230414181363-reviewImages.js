'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const reviewImagesData = [
  {
    reviewId: 1,
    url: 'review1-karen-millies-purrfect-cat-tree.jpg',
  },
  {
    reviewId: 3,
    url: 'review3-harrison-stud-rock-castle.jpg',
  },
  {
    reviewId: 4,
    url: 'review4-katie-reviews-Millies-purrfect-cat-tree.jpg',
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
      id: { [Op.in]: [1,2,3] }
    }, {})
  }
};
