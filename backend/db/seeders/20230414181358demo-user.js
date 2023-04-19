'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
// const usersData = [
//   {
//     firstName: "Katie" ,
//     lastName: "Piele" ,
//     username: "katiepee",
//     email: "katie.pee@gmail.com",
//     hashedPassword: bcrypt.hashSync('katiepeePassword'),
//   },
//   {
//     firstName: "Chris" ,
//     lastName: "Rohrbeck" ,
//     username: "studmuffin69",
//     email: "chris.rohrbeck@gmail.com",
//     hashedPassword: bcrypt.hashSync('mr.handsomePassword'),
//   },
//   {
//     firstName: "Harrison" ,
//     lastName: "Murdock" ,
//     username: "harri",
//     email: "harrison.murdock@gmail.com",
//     hashedPassword: bcrypt.hashSync('harriPassword'),
//   },
//   {
//     firstName: "Millie" ,
//     lastName: "MewMew" ,
//     username: "milliemewmew",
//     email: "millie@gmail.com",
//     hashedPassword: bcrypt.hashSync('milliemewmewPassword'),
//   },
//   {
//     firstName: "Megan" ,
//     lastName: "Hildreth" ,
//     username: "meggiedough",
//     email: "megan.hildreth@gmail.com",
//     hashedPassword: bcrypt.hashSync('meggiedoughPassword'),
//   },
//   {
//     firstName: "Karen" ,
//     lastName: "Meany" ,
//     username: "karen",
//     email: "karen@gmail.com",
//     hashedPassword: bcrypt.hashSync('karenPassword'),
//   },

// ]
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
//    options.tableName = 'Users';
//    await queryInterface.bulkInsert(options, usersData, {});
  //  await queryInterface.bulkInsert(options, [
    // {
    //   email: 'demo@user.io',
    //   username: 'Demo-lition',
    //   hashedPassword: bcrypt.hashSync('password')
    // },
    // {
    //   email: 'user1@user.io',
    //   username: 'FakeUser1',
    //   hashedPassword: bcrypt.hashSync('password2')
    // },
    // {
    //   email: 'user2@user.io',
    //   username: 'FakeUser2',
    //   hashedPassword: bcrypt.hashSync('password3')
    // }

  //  ], {});
 
    

  },

  // async down (queryInterface, Sequelize) {
  //   options.tableName = 'Users';
  //   const Op = Sequelize.Op;
  //   await queryInterface.bulkDelete(options, {
  //     username: { [Op.in]: ['katiepee', 'studmuffin69', 'harri', 'milliemewmew', 'meggiedough', "karen" ] }
  //   }, {})
  // }

  ///delete this after render gets fixed and re comment in this code!
  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {})
  }
};
