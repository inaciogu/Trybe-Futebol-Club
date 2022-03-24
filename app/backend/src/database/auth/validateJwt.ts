import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';
import User from '../models/create-user';

const secret = readFileSync('jwt.evaluation.key', 'utf-8');

// Solução de colocar o opcional na propriedade foi baseada no código do Guilherme Gomes
export interface CheckRequest extends Request {
  userRole?: string;
}

interface TokenPayload {
  data: {
    id: number;
    username: string;
    role: string;
    email: string
  }
}

export default async (req: CheckRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'token not found' });
  }

  try {
    const { data } = await jwt.verify(token, secret) as TokenPayload;

    const user = await User.findOne({ where: { email: data.email } });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.userRole = user.role;
  } catch (error) {
    return res.status(401).json({ error: 'Invalid Token' });
  }
  next();
};
