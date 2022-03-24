import { Request, Response } from 'express';
import MatchService, { NewMatch } from '../services/matchService';

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

  static createMatch = async (req: Request, res: Response) => {
    const match: NewMatch = req.body;
    const response = await MatchService.createMatch(match);
    console.log(response.id);
    res.status(201).json(response);
  };
}
