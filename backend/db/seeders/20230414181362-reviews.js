'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
const reviewsData = [
  {
    spotId: 1,
    userId: 6,
    review: "Purrrlease, save yourself the trouble and stay away from this so-called 'cat oasis.' As soon as my paws touched the litter box, I knew we were in for a rough ride.  The litter boxes were overflowing, there were hairballs everywhere, and the staff were very clearly on catnip. I even caught one of them playing with a ball of yarn instead of cleaning! The catio barely had any toys or scratching posts to keep me entertained. Overall, this place was a cat-tastrophe. I'd rather stay at a dog house than come back here.",
    stars: 1,
  },
  {
    spotId: 4,
    userId: 6,
    review: "Disappointing stay at Satan's Palace. No tortured souls, no screams of agony, no infernal flames. Satan was a total sad sap. One star.",
    stars: 1
  },
  {
    spotId: 2,
    userId: 3,
    review: "Stud Rock Castle was a dream come true for me! The private gym had everything I needed to stay fit, and the mirror was so good that I almost fell in love with myself. The shared dormitory and showers were great for bonding with other handsome hunks who love to pump iron. And let's face it, with no girls allowed the protein bar wasnt the only way to get a protien shake, if you catch my drift. Stud Rock Castle is the ultimate destination for fitness fanatics and handsome stud muffins. I'll be back for sure!",
    stars: 5,
  },
  {
    spotId: 1,
    userId: 1,
    review: "Meow-wow! My stay at Millie's Purrfect Cat Tree was truly the cat's meow. The cozy cat house was filled with everything a feline could dream of, from plush beds and scratching posts to endless toys and treats. The catio was the purrfect spot to soak up the sun and explore the climbing structures. And the modern amenities, like the self-cleaning litter box and smart feeding station, made life even easier for this pampered kitty. I give Millie's Purrfect Cat Tree two paws up and a whole lot of purrs. It's the ultimate feline paradise and the perfect vacation spot for any cat looking to live like royalty.",
    stars: 5,
  },

  {
    spotId: 6,
    userId: 1,
    review: "I loved my stay at Megan's Moms House. Megans Mom was the coolest, I loved drinking wine with Cathy everyday, and I love being in megans presence so much, it was just the best. I accidentally gave Megan nuts, and Almost killed her, sorry Megan!",
    stars: 5,
  },
  {
    spotId: 9,
    userId: 6,
    review: "What a disaster! The tree house was infested with bugs, and the manager had the audacity to suggest it was part of the 'natural experience.' I demanded a refund and spoke to the manager's manager, but they were no help either. The tree house lacked the necessary foliage and even had the nerve to be smaller than I expected. Absolutely unacceptable!",
    stars: 1,
  },
  {
    spotId: 3,
    userId: 6,
    review: "I can't believe I wasted my precious time in this so - called tree house. The branches were too far apart for my liking, and the tree trunk was not up to my standards.I demanded to see the manager, but they didn't seem to care about my concerns. The lack of amenities and entitled squirrels running around ruined my peaceful entitlement. Im filing a complaint with corporate and will never recommend this place to any fellow Karens.Total disappointment.",
    stars: 1
  },
  {
    spotId: 12,
    userId: 9,
    review: 'Oh boy, what a place!',
    stars: 5
  },
  {
    spotId: 11,
    userId: 9,
    review: 'Oh boy, what a place!',
    stars: 5
  },
  {
    spotId: 10,
    userId: 9,
    review: 'Oh boy, what a place!',
    stars: 5
  }

]
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await queryInterface.bulkInsert(options, reviewsData, {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {})
  }
};
