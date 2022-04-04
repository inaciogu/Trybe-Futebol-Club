// import MatchService from './matchService';
import Matchs from '../models/matchs';
// import CalculateHomeStats from '../utils/teamStats';
import HomeMatchs from '../interfaces/match';
import Clubs from '../models/clubs';
import ILeaderboard from '../interfaces/leaderboard';
import CalculateHomeStats from '../utils/teamStats';

// classe service também inspirada no código do Rodolgo Braga

export default class LeaderboardService {
  static getMatchs = async (): Promise<HomeMatchs[]> => {
    const matchs = await Clubs.findAll({
      include:
        [{ model: Matchs, as: 'homeMatchs', where: { inProgress: false } }],
    });
    return matchs as HomeMatchs[];
  };

  static buildLeaderboard = (homeTeamMatchs: HomeMatchs[]): ILeaderboard[] => {
    const leaderboard = homeTeamMatchs.map(({ clubName, homeMatchs }) => {
      const teamInfos = new CalculateHomeStats(homeMatchs);
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
}
