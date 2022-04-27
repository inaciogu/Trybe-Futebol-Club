import User from '../models/create-user';

export type UserWithoutPassword = Exclude<User, 'password'>;
