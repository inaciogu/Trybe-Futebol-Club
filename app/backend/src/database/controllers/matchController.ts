import { Request, Response } from 'express';
import MatchService from '../services/matchService';

export default class MatchController {
  static findMatchs = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (inProgress) {
      const response = await MatchService.findByQuery((inProgress === 'true'));
      return res.status(200).json(response);
    }

    const response = await MatchService.findMatchs();
    return res.status(200).json(response);
  };
}
