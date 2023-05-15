const urls =
  [
    'https://cdn.discordapp.com/attachments/1106274559671418943/1107553002258169896/IMG_2938.jpg',
    "https://cdn.discordapp.com/attachments/1106274559671418943/1107553001960378428/IMG_2981.jpg",
    "https://cdn.discordapp.com/attachments/1106274559671418943/1107553002535002223/IMG_3347.jpg",
    "https://cdn.discordapp.com/attachments/1106274559671418943/1107553002878930974/IMG_3674.jpg",
    'https://cdn.discordapp.com/attachments/1106274559671418943/1107553003201888326/IMG_3710.jpg',

  ]

const transformedArray = urls.map((url, index) => ({
  spotId: 5,
  url: url,
  preview: false
}));

console.log(transformedArray);