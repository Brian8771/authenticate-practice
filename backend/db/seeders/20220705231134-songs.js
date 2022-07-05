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
   await queryInterface.bulkInsert('Songs', [
    {
      userId: 1,
      albumId: 0,
      title: 'BriansSong',
      description: 'Brians journey finishing the backend project',
      url: 'brian8771.url',
      previewImage: 'url.for/photo'
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
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('Songs', {
      title: {[Op.in]: ['BriansSong']}
    }, {})
  }
};
