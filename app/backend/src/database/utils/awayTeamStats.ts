import Match from '../models/matchs';

export default class CalculateAwayStats {
  constructor(public matchs: Match[]) {}

  public getTotalPoints(): number {
    return this.getTotalVictories() * 3 + this.getTotalDraws();
  }

  public getTotalGames(): number {
    return this.matchs?.length;
  }

  public getTotalVictories(): number {
    return this.matchs?.reduce((acc, match) => {
      if (match.awayTeamGoals > match.homeTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }

  public getTotalDraws(): number {
    return this.matchs?.reduce((acc, match) => {
      if (match.homeTeamGoals === match.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }

  public getTotalLosses(): number {
    return this.matchs?.reduce((acc, match) => {
      if (match.awayTeamGoals < match.homeTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }

  public getGoalsFavor(): number {
    return this.matchs?.reduce((acc, match) => acc + match.awayTeamGoals, 0);
  }

  public getGoalsOwn(): number {
    return this.matchs?.reduce((acc, match) => acc + match.homeTeamGoals, 0);
  }

  public getGoalsBalance(): number {
    return this.getGoalsFavor() - this.getGoalsOwn();
  }

  public getEfficiency(): number {
    const efficiency = (this.getTotalPoints() / (this.getTotalGames() * 3)) * 100;
    return Number(efficiency.toFixed(2));
  }
}
