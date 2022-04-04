import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

export default class LeaderboardController {
  static getRankings = async (_req: Request, res: Response) => {
    const response = await LeaderboardService.getLeaderboard();
    res.status(200).json(response);
  };
}
