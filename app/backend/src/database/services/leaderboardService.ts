import Matchs from '../models/matchs';
import MatchService from './matchService';

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

  /* getEfficiency = (match: any) => {
    const efficiency = (match.totalPoints / (match.totalGames * 3)) * 100;
    return Number(efficiency.toFixed(2));
  }; */

  getHomeTeamScore = async () => {
    const matchs = await MatchService.findMatchs();
    matchs.reduce((acc, current) => {
      if (current.homeTeamGoals > current.awayTeamGoals) {
        this.V += 1;
        this.P += 3;
      } else if (current.awayTeamGoals > current.homeTeamGoals) {
        this.D += 1;
      } else {
        this.E += 1;
        this.P += 1;
      }
      this.J += 1;
      this.GP = acc.homeTeamGoals + current.homeTeamGoals;
      this.GC = acc.awayTeamGoals + current.awayTeamGoals;
      this.SG = this.GP - this.GC;
      this.Aproveitamento = (this.P / (this.J * 3)) * 100;
      return acc;
    });
  };
}
