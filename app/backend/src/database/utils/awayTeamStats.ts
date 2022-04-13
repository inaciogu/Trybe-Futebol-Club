import Match from '../models/matchs';

export default class CalculateAwayStats {
  constructor(public matchs: Match[]) {}

  public totalPoints(): number {
    return this.totalVictories() * 3 + this.totalDraws();
  }

  public totalGames(): number {
    return this.matchs?.length;
  }

  public totalVictories(): number {
    return this.matchs?.reduce((acc, match) => {
      if (match.awayTeamGoals > match.homeTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }

  public totalDraws(): number {
    return this.matchs?.reduce((acc, match) => {
      if (match.homeTeamGoals === match.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }

  public totalLosses(): number {
    return this.matchs?.reduce((acc, match) => {
      if (match.awayTeamGoals < match.homeTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }

  public goalsFavor(): number {
    return this.matchs?.reduce((acc, match) => acc + match.awayTeamGoals, 0);
  }

  public goalsOwn(): number {
    return this.matchs?.reduce((acc, match) => acc + match.homeTeamGoals, 0);
  }

  public goalsBalance(): number {
    return this.goalsFavor() - this.goalsOwn();
  }

  public efficiency(): number {
    const efficiency = (this.totalPoints() / (this.totalGames() * 3)) * 100;
    return Number(efficiency.toFixed(2));
  }
}
