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
      body: 'This is really good'
    },
    {
      userId: 1,
      songId: 1,
      body: 'Wow this is really good'
    },
    {
      userId: 1,
      songId: 2,
      body: 'This is insane'
    },
    {
      userId: 1,
      songId: 2,
      body: 'On my top 10'
    },
    {
      userId: 2,
      songId: 3,
      body: 'Tame Impala never fails'
    },
    {
      userId: 2,
      songId: 3,
      body: 'Cant wait for their concert'
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
