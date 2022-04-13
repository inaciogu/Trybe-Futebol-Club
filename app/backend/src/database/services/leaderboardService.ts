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

  static getGeneralMatchs = async (): Promise<TeamMatchs[]> => {
    const matchs = await Clubs.findAll({
      include:
      [
        { model: Matchs, as: 'homeMatchs', where: { inProgress: false } },
        { model: Matchs, as: 'awayMatchs', where: { inProgress: false } },
      ],
    });
    return matchs as TeamMatchs[];
  };

  static buildLeaderboard = (homeTeamMatchs: TeamMatchs[], isAway?: boolean): ILeaderboard[] => {
    const leaderboard = homeTeamMatchs.map(({ clubName, homeMatchs, awayMatchs }) => {
      const teamInfos = isAway ? new CalculateAwayStats(awayMatchs)
        : new CalculateHomeStats(homeMatchs);
      return {
        name: clubName,
        totalPoints: teamInfos.totalPoints(),
        totalGames: teamInfos.totalGames(),
        totalVictories: teamInfos.totalVictories(),
        totalDraws: teamInfos.totalDraws(),
        totalLosses: teamInfos.totalLosses(),
        goalsFavor: teamInfos.goalsFavor(),
        goalsOwn: teamInfos.goalsOwn(),
        goalsBalance: teamInfos.goalsBalance(),
        efficiency: teamInfos.efficiency(),
      };
    });
    return leaderboard;
  };

  static buildGeneralLeaderboard = (generalMatchs: TeamMatchs[]): ILeaderboard[] => {
    const leaderboard = generalMatchs.map(({ clubName, homeMatchs, awayMatchs }) => {
      const homeStats = new CalculateHomeStats(homeMatchs);
      const awayStats = new CalculateAwayStats(awayMatchs);
      return {
        name: clubName,
        totalPoints: (homeStats.totalPoints() + awayStats.totalPoints()),
        totalGames: (homeStats.totalGames() + awayStats.totalGames()),
        totalVictories: (homeStats.totalVictories() + awayStats.totalVictories()),
        totalDraws: (homeStats.totalDraws() + awayStats.totalDraws()),
        totalLosses: (homeStats.totalLosses() + awayStats.totalLosses()),
        goalsFavor: (homeStats.goalsFavor() + awayStats.goalsFavor()),
        goalsOwn: (homeStats.goalsOwn() + awayStats.goalsOwn()),
        goalsBalance: (homeStats.goalsBalance() + awayStats.goalsBalance()),
        efficiency: Math.round((((awayStats.totalPoints() + homeStats.totalPoints())
        / ((homeStats.totalGames() + awayStats.totalGames()) * 3)) * 100) * 100) / 100,
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

  static getGeneralLeaderboard = async () => {
    const generalMatchs = await this.getGeneralMatchs();
    const generalLeaderboard = this.buildGeneralLeaderboard(generalMatchs);
    return this.sortLeaderboard(generalLeaderboard);
  };
}
