import { Router } from 'express';
import ClubController from '../controllers/clubController';

const clubs = Router();

clubs.get('/', ClubController.findClubs);
clubs.get('/:id', ClubController.findClubById);

export default clubs;
