'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const spotImagesData = [
  {
    spotId: 1, 
    url: 'ThePleasurePalacePhoto1.jpg',
    preview: true,
  },
  {
    spotId: 2, 
    url: 'StudRockCastlePhoto1.jpg',
    preview: true,
  },
  {
    spotId: 2, 
    url: 'StudRockCastlePhoto2.jpg',
    preview: false,
  },
  {
    spotId: 2, 
    url: 'StudRockCastlePhoto3.jpg',
    preview: false,
  },
  {
    spotId: 3, 
    url: "DropZoneBunkHousePhoto1.jpg",
    preview: true,
  },
  {
    spotId: 4, 
    url: "SatansPalacePhoto1.jpg",
    preview: true,
  },
  {
    spotId: 4, 
    url: "SatansPalacePhoto2.jpg",
    preview: false,
  },
  {
    spotId: 5, 
    url: "Millie'sPurrfectCatTreePhoto1.jpg",
    preview: true,
  },
  {
    spotId: 5, 
    url: "Millie'sPurrfectCatTreePhoto2.jpg",
    preview: false,
  },
  {
    spotId: 5, 
    url: "Millie'sPurrfectCatTreePhoto3.jpg",
    preview: false,
  },
  {
    spotId: 6, 
    url: "Megan'sMomHousePhoto1.jpg",
    preview: true,
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
      id: { [Op.in]: [1,2,3,4,5,6,7,8,9,10,11] }
    }, {})
  }
};
