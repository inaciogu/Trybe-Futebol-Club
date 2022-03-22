import { NextFunction, Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import User from '../models/create-user';

interface LoginProps {
  email: string;
  password: string;
}

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password }: LoginProps = req.body;

  const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (!email) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }

  if (!password) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }

  if (email !== '' && !regexEmail.test(email)) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  if (password.length <= 6) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  next();
};

export const validateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password }: LoginProps = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(404).json({ message: 'User does not exist' });
  }

  const checkPassword = bcrypt.compareSync(password, user.password);

  if (!checkPassword) {
    return res.status(401).json({ message: 'Wrong password' });
  }

  next();
};
