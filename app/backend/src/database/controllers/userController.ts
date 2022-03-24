import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { readFileSync } from 'fs';
import UserService from '../services/userService';
import { CheckRequest } from '../auth/validateJwt';

const secret = readFileSync('jwt.evaluation.key', 'utf-8');

export default class UserController {
  static login = async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await UserService.findUser(email);
    const token = sign({ data: { email } }, secret);
    res.status(200).json({ user, token });
  };

  static checkRole = async (req: CheckRequest, res: Response) => {
    const role = req.userRole;
    res.status(200).json(role);
  };
}
