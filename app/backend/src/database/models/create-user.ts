import { Model, DataTypes } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class User extends Model {
  public id: number;

  public username: string;

  public role: string;

  public email: string;

  public password: string;
}

User.init({
  id: DataTypes.INTEGER,
  username: DataTypes.STRING,
  role: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  // ... Outras configs
  tableName: 'users',
  underscored: true,
  sequelize: db,
  // modelName: 'example',
  timestamps: false,
});

export default User;
