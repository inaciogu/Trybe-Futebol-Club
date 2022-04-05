import Clubs from '../models/clubs';
import Matchs from '../models/matchs';

export default interface HomeMatchs extends Clubs {
  homeMatchs: Matchs[];
  awayMatchs: Matchs[];
}
