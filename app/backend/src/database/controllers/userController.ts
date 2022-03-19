import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { readFileSync } from 'fs';
import UserService from '../services/userService';

const secret = readFileSync('jwt.evaluation.key', 'utf-8');

export default class UserController {
  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await UserService.findUser(email, password);
    const token = sign({ data: { email } }, secret);
    console.log({ user, token });
    res.status(200).json({ user, token });
  };

  static checkRole = async (req: Request, res: Response) => {
    const role = req.userRole;
    res.status(200).json(role);
  };
}
