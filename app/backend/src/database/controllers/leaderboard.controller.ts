import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  private leaderboardService = new LeaderboardService();

  getAll = async (req: Request, res: Response) => {
    const leaderboard = await this.leaderboardService.getAll();

    leaderboard.sort((a, b) =>
      b.totalPoints - a.totalPoints || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance || b.goalsFavor - a.goalsFavor || a.goalsOwn - b.goalsOwn);

    res.status(200).json(leaderboard);
  };
}
