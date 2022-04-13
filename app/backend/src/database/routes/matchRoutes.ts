import { Router } from 'express';
import validateJwt from '../auth/validateJwt';
import MatchController from '../controllers/matchController';
import validateMatch from '../middlewares/validateMatch';

const matchs = Router();

matchs.get('/', MatchController.findMatchs);
matchs.post('/', validateJwt, validateMatch, MatchController.createMatch);
matchs.patch('/:id', MatchController.updateGoals);
matchs.patch('/:id/finish', MatchController.updateMatch);

export default matchs;
