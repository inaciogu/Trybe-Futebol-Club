'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const Matchs = queryInterface.createTable("matchs", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      homeTeam: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'clubs',
          key: 'id'
        }
      },
      homeTeamGoals: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      awayTeam: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'clubs',
          key: 'id'
        }
      },
      awayTeamGoals: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      inProgress: {
        type: Sequelize.TINYINT,
        allowNull: false
      }
    });
    return Matchs;
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("matchs");
  }
};
