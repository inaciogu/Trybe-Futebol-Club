// import MatchService from './matchService';
import Matchs from '../models/matchs';
// import CalculateHomeStats from '../utils/teamStats';
import Clubs from '../models/clubs';
import ILeaderboard from '../interfaces/leaderboard';
import CalculateHomeStats from '../utils/teamStats';
import CalculateAwayStats from '../utils/awayTeamStats';
import TeamMatchs from '../interfaces/match';

// classe service também inspirada no código do Rodolfo Braga

export default class LeaderboardService {
  static getMatchs = async (): Promise<TeamMatchs[]> => {
    const matchs = await Clubs.findAll({
      include:
        [{ model: Matchs, as: 'homeMatchs', where: { inProgress: false } }],
    });
    return matchs as TeamMatchs[];
  };

  static getAwayMatchs = async (): Promise<TeamMatchs[]> => {
    const matchs = await Clubs.findAll({
      include:
        [{ model: Matchs, as: 'awayMatchs', where: { inProgress: false } }],
    });
    return matchs as TeamMatchs[];
  };

  static buildLeaderboard = (homeTeamMatchs: TeamMatchs[], isAway?: boolean): ILeaderboard[] => {
    const leaderboard = homeTeamMatchs.map(({ clubName, homeMatchs, awayMatchs }) => {
      const teamInfos = isAway ? new CalculateAwayStats(awayMatchs)
        : new CalculateHomeStats(homeMatchs);
      return {
        name: clubName,
        totalPoints: teamInfos.getTotalPoints(),
        totalGames: teamInfos.getTotalGames(),
        totalVictories: teamInfos.getTotalVictories(),
        totalDraws: teamInfos.getTotalDraws(),
        totalLosses: teamInfos.getTotalLosses(),
        goalsFavor: teamInfos.getGoalsFavor(),
        goalsOwn: teamInfos.getGoalsOwn(),
        goalsBalance: teamInfos.getGoalsBalance(),
        efficiency: teamInfos.getEfficiency(),
      };
    });
    return leaderboard;
  };

  static sortLeaderboard = (leaderboard: ILeaderboard[]) => leaderboard.sort((a, b) => (
    b.totalPoints - a.totalPoints
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn
  ));

  static getLeaderboard = async () => {
    const homeMatchs = await this.getMatchs();
    const leaderboard = this.buildLeaderboard(homeMatchs);
    return this.sortLeaderboard(leaderboard);
  };

  static getAwayLeaderboard = async () => {
    const awayMatchs = await this.getAwayMatchs();
    const leaderboard = this.buildLeaderboard(awayMatchs, true);
    return this.sortLeaderboard(leaderboard);
  };
}
