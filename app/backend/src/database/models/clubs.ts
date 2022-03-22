import { Model, DataTypes } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class Clubs extends Model {
  public id: number;

  public clubName: string;
}

Clubs.init({
  id: { type: DataTypes.INTEGER, primaryKey: true },
  clubName: DataTypes.STRING,
}, {
  // ... Outras configs
  tableName: 'clubs',
  underscored: true,
  sequelize: db,
  // modelName: 'example',
  timestamps: false,
});

export default Clubs;
