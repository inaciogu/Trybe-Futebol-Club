import Clubs from '../models/clubs';
import Matchs from '../models/matchs';

export interface NewMatch {
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

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

  static createMatch = async (match: NewMatch) => {
    const create = await Matchs.create(match);

    return create;
  };

  static updateProgress = async (inProgress: boolean, id: string) => {
    await Matchs.update({ inProgress }, { where: { id } });

    const match = await Matchs.findOne({ where: { id } });
    return match;
  };
}
