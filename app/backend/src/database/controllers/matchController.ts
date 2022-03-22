import { Request, Response } from 'express';
import MatchService from '../services/matchService';

export default class MatchController {
  static findMatchs = async (_req: Request, res: Response) => {
    const response = await MatchService.findMatchs();
    res.status(200).json(response);
  };
}
