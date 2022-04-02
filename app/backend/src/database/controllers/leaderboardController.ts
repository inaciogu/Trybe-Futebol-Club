import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

const leaderboard = new LeaderboardService();

export default class LeaderboardController {
  static getRankings = async (req: Request, res: Response) => {
    const response = await leaderboard.getHomeTeamScore();
    res.status(200).json(response);
  };
}
