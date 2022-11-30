import { Request, Response } from 'express';
import Token from '../../utils/token';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  private matchesService = new MatchesService();
  private token = new Token();

  getAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    if (inProgress) {
      const condition = inProgress === 'true';

      const inProgressMatches = await this.matchesService.getInProgress(condition);

      return res.status(200).json(inProgressMatches);
    }

    const allMatches = await this.matchesService.getAll();

    return res.status(200).json(allMatches);
  };

  insertMatch = async (req: Request, res: Response) => {
    const { authorization } = req.headers;

    if (authorization) {
      try {
        this.token.validate(authorization);
        const insertedMatch = await this.matchesService.insertMatch(req.body);

        return res.status(201).json(insertedMatch);
      } catch (_error) {
        return res.status(401).send({ message: 'Token must be a valid token' });
      }
    }
    return res.status(401).end();
  };

  finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;

    await this.matchesService.finishMatch(Number(id));

    res.status(200).send({ message: 'Finished' });
  };

  updateMatchScore = async (req: Request, res: Response) => {
    const { id } = req.params;

    await this.matchesService.updateMatchScore(Number(id), req.body);

    res.status(200).send({ message: 'updated!' });
  };
}
