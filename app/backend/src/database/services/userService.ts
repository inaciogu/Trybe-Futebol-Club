import User from '../models/create-user';

export default class UserService {
  static findUser = async (email: string, password: string) => {
    const foundUser = await User.findOne({ where: { email, password }, attributes: { exclude: ['password'] } });
    return foundUser;
  }; 
}
