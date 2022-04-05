import Clubs from '../models/clubs';
import Matchs from '../models/matchs';

export default interface TeamMatchs extends Clubs {
  homeMatchs: Matchs[];
  awayMatchs: Matchs[];
}
