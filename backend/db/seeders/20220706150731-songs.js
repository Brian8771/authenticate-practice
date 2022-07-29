'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   try {
     await queryInterface.bulkInsert('Songs', [
      {
        userId: 1,
        albumId: 1,
        title: 'BriansSong',
        description: 'Brians journey finishing the backend project',
        url: 'https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav',
        previewImage: 'https://m.media-amazon.com/images/I/A1LVEJikmZL._SL1500_.jpg',
        createdAt: '2022-06-10 10:00:00'
      },
      {
        userId: 1,
        albumId: 1,
        title: 'song of Brian',
        description: 'Brians song about Brian',
        url: 'https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav',
        previewImage: 'https://cdn.musebycl.io/2021-04/cream_disraeligears.jpg',
        createdAt: '2022-06-11 00:00:00'
      },
      {
        userId: 2,
        albumId: 2,
        title: 'Mind Mischief',
        description: 'A Tame Impala song',
        url: 'https://www2.cs.uic.edu/~i101/SoundFiles/CantinaBand3.wav',
        previewImage: 'https://m.media-amazon.com/images/I/A1Hxn7+in3L._SL1500_.jpg',
        createdAt: '2022-06-10 00:00:00'
      },
      {
        userId: 2,
        albumId: 2,
        title: 'Apocalypse Dreams',
        description: 'A song by Tame Impala',
        url: 'https://www2.cs.uic.edu/~i101/SoundFiles/CantinaBand3.wav',
        previewImage: 'https://m.media-amazon.com/images/I/A1Hxn7+in3L._SL1500_.jpg',
        createdAt: '2022-06-10 00:00:00'
      }
     ], {})

   }
   catch(err){
    console.log(err)
    throw err
   }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Songs', {
      title: {[Op.in]: ['BriansSong', 'song of Brian', 'Mind Mischief', 'Apocalypse Dreams']}
    }, {})
  }
};
