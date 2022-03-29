import { NextFunction, Request, Response } from 'express';
import Clubs from '../models/clubs';

const validateMatch = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;

  if (homeTeam === awayTeam) {
    return res.status(401).json(
      { message: 'It is not possible to create a match with two equal teams' },
    );
  }

  const isValidHomeTeam = await Clubs.findOne({ where: { id: homeTeam } });
  const isValidAwayTeam = await Clubs.findOne({ where: { id: awayTeam } });

  if (!isValidHomeTeam || !isValidAwayTeam) {
    return res.status(401).json({ message: 'There is no team with such id!' });
  }

  next();
};

export default validateMatch;
