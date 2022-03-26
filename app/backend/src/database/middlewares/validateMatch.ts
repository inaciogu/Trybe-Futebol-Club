import { NextFunction, Request, Response } from 'express';
import Clubs from '../models/clubs';

const validateMatch = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;

  if (homeTeam === awayTeam) {
    return res.status(401).json(
      { message: 'It is not possible to create a match with two equal teams' },
    );
  }

  /* const isValidTeam = await Clubs.findOne({  }) */

  next();
};

export default validateMatch;
