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
        },
        field: 'home_team'
      },
      homeTeamGoals: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'home_team_goals'
      },
      awayTeam: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'clubs',
          key: 'id'
        },
        field: 'away_team'
      },
      awayTeamGoals: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'away_team_goals'
      },
      inProgress: {
        type: Sequelize.TINYINT,
        allowNull: false,
        field: 'in_progress'
      }
    });
    return Matchs;
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("matchs");
  }
};
