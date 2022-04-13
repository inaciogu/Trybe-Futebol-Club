import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboardController';

const leaderboard = Router();

leaderboard.get('/', LeaderboardController.getGeneralRankings);
leaderboard.get('/home', LeaderboardController.getRankings);
leaderboard.get('/away', LeaderboardController.getAwayRankings);

export default leaderboard;
