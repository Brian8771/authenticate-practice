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
   await queryInterface.bulkInsert('Comments', [
    {
      userId: 1,
      songId: 1,
      body: 'This song speaks to me'
    },
    {
      userId: 1,
      songId:1,
      body: 'Best song ever'
    },
    {
      userId: 1,
      songId: 1,
      body: 'Im in awe how good this is'
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

     await queryInterface.bulkDelete('Comments', {}, {})
  }
};
