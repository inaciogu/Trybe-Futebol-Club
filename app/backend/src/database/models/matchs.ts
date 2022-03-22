import { Model, DataTypes } from 'sequelize';
import db from '.';
import Clubs from './clubs';
// import OtherModel from './OtherModel';

class Matchs extends Model {
  public id: number;

  public homeTeam: number;

  public homeTeamGoals: number;

  public awayTeam: number;

  public awayTeamGoals: number;

  public inProgress: boolean;
}

Matchs.init({
  id: { type: DataTypes.INTEGER, primaryKey: true },
  homeTeam: DataTypes.INTEGER,
  homeTeamGoals: DataTypes.INTEGER,
  awayTeam: DataTypes.INTEGER,
  awayTeamGoals: DataTypes.INTEGER,
  inProgress: DataTypes.TINYINT,
}, {
  // ... Outras configs
  tableName: 'matchs',
  underscored: true,
  sequelize: db,
  // modelName: 'example',
  timestamps: false,
});

Clubs.hasMany(Matchs, { foreignKey: 'home_team', as: 'teamA' });
Clubs.hasMany(Matchs, { foreignKey: 'away_team', as: 'teamB' });

Matchs.belongsTo(Clubs, { foreignKey: 'home_team', as: 'teamA' });
Matchs.belongsTo(Clubs, { foreignKey: 'away_team', as: 'teamB' });

export default Matchs;
