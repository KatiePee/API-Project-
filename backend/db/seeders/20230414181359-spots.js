'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
const spotsData = [

  {
    ownerId: 4,
    address: '8008 Kitty Cat Circle',
    city: "Meowville",
    state: "Cat-sachusetts",
    country: "Purrlandia",
    lat: 42.114999,
    lng: -71.107475,
    name: "Millie's Purrfect Cat Tree",
    description: "Welcome to our feline paradise in the heart of Purrlandia! Our cozy cat house is the purrfect retreat for your furry friends. Equipped with multiple scratching posts, plush beds, and an endless supply of toys and treats, it's a cat's dream come true. The house also features a spacious catio with plenty of sunbathing spots and climbing structures for your cats to explore. You'll love the modern amenities, including a self-cleaning litter box, a smart feeding station, and a cat-friendly air purifier. And don't forget to try our signature catnip tea, made with fresh herbs from our garden! Whether you're traveling with your cats or looking for a staycation spot for your feline family, our cat house is the ultimate oasis for cats. Book now and let your kitties live like royalty!",
    price: 100,
  },
  {
    ownerId: 2,
    address: "123 Stud Hill",
    city: "Handsome Man City",
    state: "Utah",
    country: "USA",
    lat: 38.573322,
    lng: -109.544552,
    name: "Stud Rock Castle",
    description: "Welcome to our fitness fortress, the ultimate pad for handsome hunks who love to pump iron and break hearts. Our apartment comes equipped with a private gym, a protein bar, and a mirror that will make you want to flex 24/7. Whether you're into Crossfit, bodybuilding, or just looking for a place to show off your gains, this is the spot for you. So book now, and let's get ripped together! Shared Dormatory, Shared Showers, no girls allowed",
    price: 50.00,
  },
  {
    ownerId: 3,
    name: 'Cozy Cottage',
    address: '6969 Prance Place',
    city: 'Bellingham',
    state: 'WA',
    country: 'USA',
    lat: 48.7519,
    lng: -122.4787,
    price: 69.99,
    "description": "The dream has come true! This fabulous suite is totally eco-friendly, built 100% on top of an old jack-o-lanter, it did not use any nails in the tree and not a gram of cement! Being in the treetops of the Atlantic forest, it is very cool and a great viewpoint with fabulous view of the sea of Paraty-mirim, in addition to seeing many birds and animals. This suite is great for couples of any age who enjoy a deep contact with nature. Easy access by trail and ramp!"

  },
  {
    ownerId: 4,
    address: '666 Hail Satan',
    city: "Sin City",
    state: "Oklahoma",
    country: "Hell",
    lat: 34.992858,
    lng: -97.599415,
    name: "Satan's Place",
    description: "Luxurious and eerie, Satan's Palace on Airbnb boasts black stone, gold doors, plush beds, and marble baths. Property is decorated in sin, and has a sinister and unsettling vibe. With hidden passageways, eerie music and strange occurrences,  it's not for the faint of heart.",
    price: 666.00,
  },
  {
    ownerId: 1,
    address: "1810 Broadway St",
    city: "Oceanside",
    state: "CA",
    country: "USA",
    lat: 33.174045,
    lng: -117.363037,
    name: "The Pleasure Palace",
    description: "Lovely 2 bedroom apartment in South Oceanside, 2 blocks from the beach, and walking distance to Best Pizza, Cats are welcome... sorry no dogs!",
    price: 300.00,
  },

  {
    ownerId: 5,
    address: '3906 Swarthmore St',
    city: 'Houston',
    state: 'Texas',
    country: 'USA',
    lat: 29.713813592637486,
    lng: -95.44293133241067,
    name: 'Megans Moms House',
    description: "Right in the heart of Rice Village in Houston, Texas! Relaxing patio space, super friendly hosts who you could kick back and enjoy a glass of wine with. NO NUTS ALLOWED ON PROPERTY, OR I WILL DIE!!!",
    price: 75,
  },
  {
    ownerId: 1,
    name: 'Serenity Treehouse',
    address: '6969 Maple Grove Pl',
    city: 'Portland',
    state: 'OR',
    country: 'USA',
    lat: 45.5231,
    lng: -122.6765,
    price: 345.67,
    "description": "This tree house is very unique. It features two separate sleeping quarters to give renters the ability to accommodate more friends and enjoy time together but also have private time at night. Its 25 feet up in the trees and has plenty of nature coming through and around the decks. Its also has all the amenities one would want for comfort in the main house with heat/ AC, TV, Shower, and Toilet. The bunk house also has TV/DVD, heat and AC. Come enjoy nature at its best."
  },
  {
    ownerId: 4,
    name: 'Majestic Treehouse',
    address: '777 Lucky St',
    city: 'Seattle',
    state: 'WA',
    country: 'USA',
    lat: 47.6062,
    lng: -122.3321,
    price: 124.99,
    "description": "Stunning Tree house looking over the Strait of Juan De Fuca is a total North-West Washington experience. It is made of cedar with rustic touches. Once you are inside you will never want to leave as the floor to ceiling window looks onto the straight and with constant moving landscape of cruise ships, wildlife, and bald eagles soaring across your window. Who needs TV when you have such a captivating changing scenery. Never miss the Sunset as you snuggle on the couch or private porch."

  },
  {
    ownerId: 9,
    name: 'Enchanted Forest Retreat',
    address: '1234 Magic Ln',
    city: 'Eugene',
    state: 'OR',
    country: 'USA',
    lat: 44.0521,
    lng: -123.0868,
    price: 568.32,
    "description": "Hidden amidst the dense foliage of Baguio City’s pinewood forest, Tudor in the Pines is a remarkable estate in the Philippines compromising of seven (7) unique residences within a gated property, accommodating a maximum of 30 guests. With the convenience of multiple road accesses to and from the city, and to different highland provinces of the Cordilleras. Tudor in the Pines is perfectly located as your home base to travel the Northern wonders of the Philippines."

  },
  {
    ownerId: 2,
    name: 'Whispering Studs Cabin',
    address: '5678 Mountain Rd',
    city: 'Asheville',
    state: 'NC',
    country: 'USA',
    lat: 35.5951,
    lng: -82.5515,
    price: 145.00,
    "description": "Imagine being immersed in a small enchanted forest only 100’s of feet off of Main street. Nestled into live oak trees that gently sway in the breeze, under dark skies with bright stars, and curated to both inspire joy and create presence. Welcome to our little magical treehouse and landscape resort in Fredericksburg. The amazing stays in our secluded forest are only minutes to all of the beautiful shops, cafes, restaurants, bars, and Vineyards. A magical stay that we hope you will love."
  },
  {
    ownerId: 5,
    name: 'Mystical Treehouse',
    address: '4321 Enchantment Dr',
    city: 'Bellingham',
    state: 'WA',
    country: 'USA',
    lat: 48.7519,
    lng: -122.4787,
    price: 299.0,
    "description": "Aptly named the Osprey Treehouse because of the multiple Osprey that spent the summer hovering and watching us build this 20-foot octagon building around a single grand 42-inch old Douglas Fir. Oversized windows and a sliding door give you the feeling of being high up in the trees. Sleeps 2 adults. For safety reasons, we do not allow pets or children younger than 12. The entrance is level and parking close. Cleaning fee is $50 and applicable taxes are already added to your bill."
  },
  {
    ownerId: 9,
    name: 'Rustic Retreat',
    address: '3698 Woodland Rd',
    city: 'Bend',
    state: 'OR',
    country: 'USA',
    lat: 44.0582,
    lng: -121.3153,
    price: 189.99,
    "description": "Montana Treehouse Retreat as featured in: Zillow, DIY Network, HGTV, Time, Outside Mag. Nestled on 5 wooded acres, this artistically designed two story treehouse has all the luxury amenities. Within 30 minutes to Glacier National Park, minutes from Whitefish Mtn Ski Resort. Best of both worlds if you want to experience Montana nature as well have access to restaurants/shopping/ activities in Whitefish and Columbia Falls (within a 5 min drive). Glacier Park International Airport is 10 miles away."

  },
  {
    ownerId: 9,
    name: 'Wildwood Treehouse',
    address: '9876 Cedar Ave',
    city: 'Portland',
    state: 'OR',
    country: 'USA',
    lat: 45.5231,
    lng: -122.6765,
    price: 99.99,
    "description": "Outrageously beautiful modern treehouse aframe cabin perched 13ft off the ground between 4 evergreen trees. Brand new with luxurious finishes, a two person hot tub, full bathroom, fireplace, giant skylights, and a king bed sleeping loft. We proudly donate portions of guest proceeds to The Sierra Club, Forterra (saved Lake Serene Trail), WTA, and The Tulalip Foundation."

  },




]
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkInsert(options, spotsData, {})
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3, 4, 5, 6] }
    }, {})
  }
};
