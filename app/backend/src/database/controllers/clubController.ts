import { Request, Response } from 'express';
import ClubService from '../services/clubsService';

export default class ClubController {
  static findClubs = async (_req: Request, res: Response) => {
    const response = await ClubService.findClubs();
    res.status(200).json(response);
  };

  static findClubById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await ClubService.findById(id);
    res.status(200).json(response);
  };
}
