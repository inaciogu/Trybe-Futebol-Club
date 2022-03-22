import Clubs from '../models/clubs';
import Matchs from '../models/matchs';

export default class MatchService {
  static findMatchs = async () => {
    const matchs = await Matchs.findAll({ include: [
      { model: Clubs, as: 'homeClub', attributes: ['clubName'] },
      { model: Clubs, as: 'awayClub', attributes: ['clubName'] },
    ] });
    return matchs;
  };
}
