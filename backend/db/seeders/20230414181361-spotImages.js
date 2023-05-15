'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const spotImagesData = [
  {
    spotId: 5,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53296516/original/5620caea-dc37-400f-8147-49f3db0d819b.jpeg?im_w=1200',
    preview: true
  },
  {
    spotId: 5,
    url: 'https://a0.muscache.com/im/pictures/a91c95db-aaea-4906-bfdc-a2f8f50680ef.jpg?im_w=720',
    preview: false
  },
  {
    spotId: 5,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53296516/original/dbbc8e44-c18e-425d-a862-656d22f79738.jpeg?im_w=720',
    preview: false
  },
  {
    spotId: 5,
    url: 'https://a0.muscache.com/im/pictures/4a6fd187-0dff-4658-aa0d-98484da392ea.jpg?im_w=720',
    preview: false
  },
  {
    spotId: 5,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53296516/original/a89c9d3a-ef38-41c3-9791-dbfe2047480c.jpeg?im_w=720',
    preview: false
  },
  {
    spotId: 2,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48246773/original/22a2c42e-108b-4809-b274-ada4f3d6da28.jpeg?im_w=960',
    preview: true
  },
  {
    spotId: 2,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48246773/original/67bca036-a1a3-4ad3-af08-cec301457b60.jpeg?im_w=720',
    preview: false
  },
  {
    spotId: 2,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48246773/original/90aee0fe-fa5e-4f4a-9ece-cb349c7b40d3.jpeg?im_w=720',
    preview: false
  },
  {
    spotId: 2,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48246773/original/15ece8ba-a04b-4659-8d7b-65ddfa313afa.jpeg?im_w=720',
    preview: false
  },
  {
    spotId: 2,
    url: 'https://a0.muscache.com/im/pictures/399db252-5254-4449-9741-492d12168d2c.jpg?im_w=720',
    preview: false
  },
  {
    spotId: 3,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-49924321/original/fe1ceea9-8f54-400b-98d1-8e19b947486f.jpeg?im_w=720',
    preview: true
  },
  {
    spotId: 3,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-49924321/original/f0da72bc-28b2-44bd-b3dc-9cb1e1ba946b.jpeg?im_w=1200',
    preview: false
  },
  {
    spotId: 3,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-49924321/original/647f3912-e2a8-4317-a4bf-e2ae2b5e2be3.jpeg?im_w=720',
    preview: false
  },
  {
    spotId: 3,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-49924321/original/3bfd8a3b-0077-4efb-87fa-4d824f6288c4.jpeg?im_w=720',
    preview: false
  },
  {
    spotId: 3,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-49924321/original/6caa639c-c2e0-4f1b-a77e-94729c9aaae6.jpeg?im_w=720',
    preview: false
  },
  {
    spotId: 4,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-16515298/original/34706494-daf1-4625-8e50-1557452dec5d.jpeg?im_w=960',
    preview: true
  },
  {
    spotId: 4,
    url: 'https://a0.muscache.com/im/pictures/d9d27d27-8fcc-4385-996a-087bccf79ab5.jpg?im_w=720',
    preview: false
  },
  {
    spotId: 4,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-16515298/original/bafd7ef0-f0cb-425a-a9f6-26c74305d79a.jpeg?im_w=720',
    preview: false
  },
  {
    spotId: 4,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-16515298/original/5eeeca63-2985-4744-b870-c4e704ba56c3.jpeg?im_w=720',
    preview: false
  },
  {
    spotId: 4,
    url: 'htts://a0.muscache.com/im/pictures/399db252-5254-4449-9741-492d12168d2c.jpg?im_w=720',
    preview: false
  },
  {
    spotId: 1,
    url: 'https://cdn.discordapp.com/attachments/1106274559671418943/1107553002258169896/IMG_2938.jpg',
    preview: true
  },
  {
    spotId: 1,
    url: 'https://cdn.discordapp.com/attachments/1106274559671418943/1107553001960378428/IMG_2981.jpg',
    preview: false
  },
  {
    spotId: 1,
    url: 'https://cdn.discordapp.com/attachments/1106274559671418943/1107553002535002223/IMG_3347.jpg',
    preview: false
  },
  {
    spotId: 1,
    url: 'https://cdn.discordapp.com/attachments/1106274559671418943/1107553002878930974/IMG_3674.jpg',
    preview: false
  },
  {
    spotId: 1,
    url: 'https://cdn.discordapp.com/attachments/1106274559671418943/1107553003201888326/IMG_3710.jpg',
    preview: false
  },
  {
    spotId: 6,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-49924321/original/bca57cdc-bc62-4366-91e9-03ba6c4059ee.jpeg?im_w=720',
    preview: true
  },
  {
    spotId: 6,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-49924321/original/9348db93-1b50-47c0-9aff-11ead5facd22.jpeg?im_w=720',
    preview: false
  },
  {
    spotId: 6,
    url: 'https://a0.muscache.com/im/pictures/a7c25c65-91ab-45dd-81ac-9dcd60c34623.jpg?im_w=720',
    preview: false
  },
  {
    spotId: 6,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-49924321/original/a100b178-2ec2-45a8-a9e8-9d3b4dd5c777.jpeg?im_w=720',
    preview: false
  },
  {
    spotId: 6,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-49924321/original/7b3a24bb-7357-4106-92d6-1065f4a60ce7.jpeg?im_w=720',
    preview: false
  },
  {
    spotId: 7,
    url: "https://a0.muscache.com/im/pictures/a8ef5d47-0b5a-4189-abaf-322753e942b2.jpg?im_w=960",
    preview: true,
  },
  {
    spotId: 7,
    url: "https://a0.muscache.com/im/pictures/05d4d257-0143-4b1f-aa23-9713efb72e4c.jpg?im_w=1200",
    preview: false,
  },
  {
    spotId: 7,
    url: "https://a0.muscache.com/im/pictures/2477d0d5-7d92-43ca-a144-3c934dc57770.jpg?im_w=1200",
    preview: false,
  },
  {
    spotId: 7,
    url: "https://a0.muscache.com/im/pictures/c7af5d53-bde4-4b38-abdb-cf70713287c9.jpg?im_w=1200",
    preview: false,
  },
  { spotId: 8, url: 'https://a0.muscache.com/im/pictures/9c6f8dd9-9758-4ef3-80b0-16cdbbda5118.jpg?im_w=1200', preview: true },
  { spotId: 8, url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48089233/original/32e6234f-2f32-4b7c-8137-ee81e9f6c7d1.jpeg?im_w=720', preview: false },
  { spotId: 8, url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48089233/original/e80c9eed-5ab9-45ae-8fc9-84b0db64fefa.jpeg?im_w=720', preview: false },
  { spotId: 8, url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48089233/original/2eef4813-7ac5-4dcb-9094-4e1c1727e3a9.jpeg?im_w=720', preview: false },
  { spotId: 8, url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48089233/original/5d43315c-91ac-41ad-a7c3-ca2672834743.jpeg?im_w=1200', preview: false },
  { spotId: 9, url: 'https://a0.muscache.com/im/pictures/c79965b5-9b22-4504-af7b-3131f5c25dfa.jpg?im_w=720', preview: true },
  { spotId: 9, url: 'https://a0.muscache.com/im/pictures/a37685ad-4b8f-402d-b9f8-d408e1e9b809.jpg?im_w=720', preview: false },
  { spotId: 9, url: 'https://a0.muscache.com/im/pictures/1564b1af-125a-40c2-a633-a70f13745896.jpg?im_w=720', preview: false },
  { spotId: 9, url: 'https://a0.muscache.com/im/pictures/62f19453-725e-4d1e-9fa5-051be20d4976.jpg?im_w=720', preview: false },
  { spotId: 9, url: 'https://a0.muscache.com/im/pictures/78362fe0-ac0e-47d5-a929-bb3be94c9695.jpg?im_w=720', preview: false },
  {
    spotId: 10,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53113872/original/808f1ec1-c1a1-47fe-828b-ff319a9edf02.jpeg?im_w=720',
    preview: true
  },
  {
    spotId: 10,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53113872/original/94011cb0-a6bf-4722-b4b5-c87c1e9dca42.jpeg?im_w=1200',
    preview: false
  },
  {
    spotId: 10,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53113872/original/4b42f25f-f82f-4bb5-aa59-517449eee671.jpeg?im_w=720',
    preview: false
  },
  {
    spotId: 10,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53113872/original/5d8f25f2-cc42-4a59-85ad-427dd9014a96.jpeg?im_w=720',
    preview: false
  },
  {
    spotId: 10,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53113872/original/d3a6869b-1220-4716-aadc-651084be8f65.jpeg?im_w=1200',
    preview: false
  },
  {
    spotId: 11,
    url: 'https://a0.muscache.com/im/pictures/ad85d477-6bfa-4153-8319-680ddd2bad3e.jpg?im_w=1200',
    preview: true
  },
  {
    spotId: 11,
    url: 'https://a0.muscache.com/im/pictures/31f0573d-856a-4277-b3ef-fcba13e7bb61.jpg?im_w=720',
    preview: false
  },
  {
    spotId: 11,
    url: 'https://a0.muscache.com/im/pictures/e5c56382-708c-4923-b87b-e494bd69721c.jpg?im_w=1200',
    preview: false
  },
  {
    spotId: 11,
    url: 'https://a0.muscache.com/im/pictures/1e817985-1f4a-44ac-8799-8a4b39698073.jpg?im_w=720',
    preview: false
  },
  {
    spotId: 12,
    url: 'https://a0.muscache.com/im/pictures/80e82bbd-8a43-44cb-86ec-e4c03bb25d7d.jpg?im_w=1200',
    preview: true
  },
  {
    spotId: 12,
    url: 'https://a0.muscache.com/im/pictures/51e8dcb7-6624-4e19-b215-e01fc3495797.jpg?im_w=720',
    preview: false
  },
  {
    spotId: 12,
    url: 'https://a0.muscache.com/im/pictures/5d845e13-e4f2-455e-8e49-bebef328fafd.jpg?im_w=720',
    preview: false
  },
  {
    spotId: 12,
    url: 'https://a0.muscache.com/im/pictures/045ed757-4f03-4987-ad04-b8a56a0d9bda.jpg?im_w=1200',
    preview: false
  },
  {
    spotId: 12,
    url: 'https://a0.muscache.com/im/pictures/90a7f880-3cf0-4bba-9b0f-ff925d726565.jpg?im_w=720',
    preview: false
  },
  {
    spotId: 13,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-24359721/original/6d94b047-4585-42d5-b759-8f88c6775575.jpeg?im_w=1200',
    preview: true
  },
  {
    spotId: 13,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-24359721/original/33e1a945-8f01-4b87-9359-10fdf204ebf1.jpeg?im_w=720',
    preview: false
  },
  {
    spotId: 13,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-24359721/original/34395672-c861-4e2d-8f73-56e91a429050.jpeg?im_w=720',
    preview: false
  },
  {
    spotId: 13,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-24359721/original/827fe72f-5e95-4a97-be03-d2d4d040a8ef.jpeg?im_w=720',
    preview: false
  },
  {
    spotId: 13,
    url: 'https://a0..muscache.com/im/pictures/399db252-5254-4449-9741-492d12168d2c.jpg?im_w=720',
    preview: false
  }






]
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkInsert(options, spotImagesData, {});
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] }
    }, {})
  }
};
