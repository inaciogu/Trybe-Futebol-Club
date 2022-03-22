import Clubs from '../models/clubs';
import Matchs from '../models/matchs';

/* interface MockedMatch {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  homeClub: {
    clubName: string;
  };
  awayClub: {
    clubName: string;
  };
} */

export default class MatchService {
  static findMatchs = async () => {
    const matchs = await Matchs.findAll({ include: [
      { model: Clubs, as: 'homeClub', attributes: ['clubName'] },
      { model: Clubs, as: 'awayClub', attributes: ['clubName'] },
    ] });
    return matchs;
  };

  static findByQuery = async (inProgress: boolean) => {
    const matchs = await Matchs.findAll({ where: { inProgress },
      include: [
        { model: Clubs, as: 'homeClub', attributes: ['clubName'] },
        { model: Clubs, as: 'awayClub', attributes: ['clubName'] },
      ] });
    return matchs;
  };
}
