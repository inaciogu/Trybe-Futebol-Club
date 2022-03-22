import User from '../models/create-user';

export default class UserService {
  static findUser = async (email: string) => {
    const foundUser = await User.findOne({ where: { email },
      attributes: { exclude: ['password'] } });
    return foundUser;
  };
}
