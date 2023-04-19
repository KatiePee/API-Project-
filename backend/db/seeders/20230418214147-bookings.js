'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const bookingsData = [
  {
    spotId: 2,
    userId: 3 ,
    startDate: '2023-04-22' ,
    endDate: '2023-04-30',
  },
  {
    spotId: 2,
    userId: 4,
    startDate: '2023-05-01',
    endDate: '2023-05-04',
  },
  {
    spotId: 5 ,
    userId: 1 ,
    startDate: '2023-04-01',
    endDate: '2023-05-01',
  },
  {
    spotId: 1,
    userId: 5,
    startDate: '2023-05-03',
    endDate: '2023-05-06',
  },

]
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    await queryInterface.bulkInsert(options, bookingsData, {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      // username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {})
  }
};
