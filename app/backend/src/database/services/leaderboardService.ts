import MatchService from './matchService';

interface ILeaderboard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

export default class LeaderboardService {
  Time: string;

  P: number;

  J: number;

  V: number;

  E: number;

  D: number;

  GP: number;

  GC: number;

  SG: number;

  Aproveitamento: number;

  
}
