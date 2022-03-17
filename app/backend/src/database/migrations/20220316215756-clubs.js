'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Clubs = queryInterface.createTable("clubs", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      clubName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'club_name'
      }
    });
    return Clubs;
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("clubs");
  }
};
