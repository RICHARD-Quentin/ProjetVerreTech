'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
 
    await queryInterface.bulkInsert('client', [{
        nom: 'Stock',
        prenom: 'Florian',
        date_naissance: '1991-05-25',
        telephone_f: '0787524548',
        isBetaMember: false
    }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
