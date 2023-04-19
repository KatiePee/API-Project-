'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
const spotsData = [
  {
    ownerId: 1,
    address: "1810 Broadway St",
    city: "Oceanside",
    state: "CA",
    country: "USA",
    lat: 33.174045 ,
    lng: -117.363037,
    name: "The Pleasure Palace",
    description: "Lovely 2 bedroom apartment in South Oceanside, 2 blocks from the beach, and walking distance to Best Pizza, Cats are welcome... sorry no dogs!",
    price: 300.00,
  },
  {
    ownerId: 2,
    address: "123 Stud Hill",
    city: "Handsome Man City",
    state: "Utah",
    country: "USA" ,
    lat:38.573322,
    lng: -109.544552,
    name: "Stud Rock Castle",
    description: "Welcome to our fitness fortress, the ultimate pad for handsome hunks who love to pump iron and break hearts. Our apartment comes equipped with a private gym, a protein bar, and a mirror that will make you want to flex 24/7. Whether you're into Crossfit, bodybuilding, or just looking for a place to show off your gains, this is the spot for you. So book now, and let's get ripped together! Shared Dormatory, Shared Showers, no girls allowed",
    price: 50.00 ,
  },
  {
    ownerId: 3,
    address: "9101 Prancers St",
    city: 'Eloy',
    state: "Arizona",
    country: 'USA',
    lat: 32.80045820551508, 
    lng: -111.58263641702624,
    name: 'DropZone bunk house' ,
    description: "2 miles away from the DZ, 10 min away from Castle Vally, pool, sauna, and outside grill. No Douche Bags!",
    price: 30.00,
  },
  {
    ownerId: 4 ,
    address: '666 Hail Satan' ,
    city: "Sin City",
    state: "Oklahoma" ,
    country: "Hell",
    lat: 34.992858,
    lng: -97.599415,
    name: "Satan's Place",
    description: "Luxurious and eerie, Satan's Palace on Airbnb boasts black stone, gold doors, plush beds, and marble baths. Property is decorated in sin, and has a sinister and unsettling vibe. With hidden passageways, eerie music and strange occurrences,  it's not for the faint of heart.",
    price: 666.00,
  },
  {
    ownerId: 4 ,
    address: '8008 Kitty Cat Circle',
    city: "Meowville",
    state: "Cat-sachusetts",
    country: "Purrlandia" ,
    lat: 42.114999, 
    lng: -71.107475,
    name: "Millie's Purrfect Cat Tree" ,
    description: "Welcome to our feline paradise in the heart of Purrlandia! Our cozy cat house is the purrfect retreat for your furry friends. Equipped with multiple scratching posts, plush beds, and an endless supply of toys and treats, it's a cat's dream come true. The house also features a spacious catio with plenty of sunbathing spots and climbing structures for your cats to explore. You'll love the modern amenities, including a self-cleaning litter box, a smart feeding station, and a cat-friendly air purifier. And don't forget to try our signature catnip tea, made with fresh herbs from our garden! Whether you're traveling with your cats or looking for a staycation spot for your feline family, our cat house is the ultimate oasis for cats. Book now and let your kitties live like royalty!" ,
    price: 100,
  },
  {
    ownerId: 5,
    address: '3906 Swarthmore St',
    city:  'Houston',
    state: 'Texas',
    country: 'USA',
    lat: 29.713813592637486, 
    lng: -95.44293133241067,
    name: 'Megans Moms House' ,
    description: "Right in the heart of Rice Village in Houston, Texas! Relaxing patio space, super friendly hosts who you could kick back and enjoy a glass of wine with. NO NUTS ALLOWED ON PROPERTY, OR I WILL DIE!!!",
    price: 75,
  },


]
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkInsert(options, spotsData, {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      // username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {})
  }
};
