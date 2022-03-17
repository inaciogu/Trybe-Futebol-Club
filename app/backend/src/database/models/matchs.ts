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
  id: DataTypes.INTEGER,
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

Clubs.belongsTo(Matchs, { foreignKey: 'home_team', as: 'teamA' });
Clubs.belongsTo(Matchs, { foreignKey: 'away_team', as: 'teamB' });

Matchs.hasMany(Clubs, { foreignKey: 'home_team', as: 'teamA' });
Matchs.hasMany(Clubs, { foreignKey: 'away_team', as: 'teamB' });

export default Matchs;
