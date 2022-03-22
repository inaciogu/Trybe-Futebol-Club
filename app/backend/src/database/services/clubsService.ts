import Clubs from '../models/clubs';

export default class ClubService {
  static findClubs = async () => {
    const clubs = await Clubs.findAll();
    return clubs;
  };

  static findById = async (id: string) => {
    const foundClub = await Clubs.findByPk(id);
    return foundClub;
  };
}
