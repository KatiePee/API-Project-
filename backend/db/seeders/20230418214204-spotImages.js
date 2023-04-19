'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const spotImagesData = [
  {
    spotId: 1, 
    url: 'ThePleasurePalacePhoto1.jpg',
  },
  {
    spotId: 2, 
    url: 'Stud Rock Castle image number 1 dot jpg'
  },
  {
    spotId: 2, 
    url: 'Stud Rock Castle image number 2 dot jpg'
  },
  {
    spotId: 2, 
    url: 'Stud Rock Castle image number 3 dot jpg'
  },
  {
    spotId: 3, 
    url: "DropZone Bunk House image number 1 dot jpg"
  },
  {
    spotId: 4, 
    url: "Satans Palace image number 1"
  },
  {
    spotId: 4, 
    url: "Satans Palace image number 2"
  },
  {
    spotId: 5, 
    url: "Millie's Purrfect Cat Tree image number 1"
  },
  {
    spotId: 5, 
    url: "Millie's Purrfect Cat Tree image number 2"
  },
  {
    spotId: 5, 
    url: "Millie's Purrfect Cat Tree image number 3"
  },
  {
    spotId: 6, 
    url: "Megan's Moms House Image number 1"
  }
]
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkInsert(options, spotImagesData, {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      // username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {})
  }
};
