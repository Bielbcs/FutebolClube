import { Request, Response } from 'express';
import TeamService from '../services/team.service';

export default class TeamController {
  constructor(private teamService = new TeamService()) {}

  getAll = async (_req: Request, res: Response) => {
    const allTeams = await this.teamService.getAll();

    res.status(200).json(allTeams);
  };

  byId = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await this.teamService.byId(Number(id));

    res.status(200).json(team);
  };
}
