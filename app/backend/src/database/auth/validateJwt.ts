import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';
import User from '../models/create-user';

const secret = readFileSync('jwt.evaluation.key', 'utf-8');

interface TokenPayload {
  data: {
    id: number;
    username: string;
    role: string;
    email: string
  }
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'token not found' });
  }

  try {
    const { data } = jwt.verify(token, secret) as TokenPayload;

    const user = await User.findOne({ where: { email: data.email } });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.userRole = user.role;

    next();
  } catch (error) {
    console.log(error);
  }
};
