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
   await queryInterface.bulkInsert('Playlists', [
    {
      userId: 1,
      name: 'Brians playlist',
      previewImage: 'dancing.url'
    },
    {
      userId: 1,
      name: 'Secret songs',
      previewImage: 'Secretephoto.url'
    },
    {
      userId: 2,
      name: 'Dance playlist',
      previewImage: 'photo.url'
    },
    {
      userId: 2,
      name: 'Sad playlist',
      previewImage: 'photo.url'
    }
   ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Playlists', {}, {})
  }
};
