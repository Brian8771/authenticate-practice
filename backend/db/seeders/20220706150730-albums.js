'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Albums', [
      {
        userId: 1,
        title: 'Brians list of songs',
        description: 'list of songs by Brian',
        previewImage: 'photoAlbum.url'
      },
      {
        userId: 2,
        title: 'Lonerism',
        description: 'Songs of Tame Impala',
        previewImage: 'photoAlbum2.url'
      },
      {
        userId: 1,
        title: 'Songs dedicated to Brian',
        description: 'list of songs dedicated to Brian',
        previewImage: 'photoAlbum3.url'
      },
      {
        userId: 1,
        title: 'Songs about Brian',
        description: 'Songs describing Brian',
        previewImage: 'photoAlbum10.url'
      },
      {
        userId: 2,
        title: 'Innerspeaker',
        description: 'Songs of Tame Impala',
        previewImage: 'photoAlbum3.url'
      },
      {
        userId: 2,
        title: 'Currents',
        description: 'Songs of Tame Impala',
        previewImage: 'photoAlbum4.url'
      },
      {
        userId: 2,
        title: 'Slow Rush',
        description: 'Songs of Tame Impala',
        previewImage: 'photoAlbum5.url'
      }
    ], {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op
    await queryInterface.bulkDelete('Albums', {
      title: { [Op.in]: ['Brians list of songs', 'Lonerism', 'Bugs list of songs'] }
    }, {})
  }
};
