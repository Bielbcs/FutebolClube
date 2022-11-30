import { NextFunction, Request, Response } from 'express';
import TeamService from '../database/services/team.service';

export const verifyEqualTeams = (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;

  if (homeTeam === awayTeam) {
    return res.status(422).send({
      message: 'It is not possible to create a match with two equal teams' });
  }
  next();
};

export const verifyExistentTeams = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  const teamsService = new TeamService();

  const teamOne = await teamsService.byId(Number(homeTeam));
  const teamTwo = await teamsService.byId(Number(awayTeam));

  if (!teamOne || !teamTwo) {
    return res.status(404).send({ message: 'There is no team with such id!' });
  }
  next();
};
