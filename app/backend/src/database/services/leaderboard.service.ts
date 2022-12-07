import ILeaderboard from '../../interfaces/ILeaderboard';
import Matches from '../models/Matches';
import MatchesService from './matches.service';
import TeamService from './team.service';

type winDrawLose = 'totalVictories' | 'totalLosses' | 'totalDraws';

export default class LeaderboardService {
  private matches = new MatchesService();
  private teams = new TeamService();

  private homeGoals = (match: Matches) => {
    if (match.homeTeamGoals > match.awayTeamGoals) return 'totalVictories';
    if (match.homeTeamGoals < match.awayTeamGoals) return 'totalLosses';
    if (match.homeTeamGoals === match.awayTeamGoals) return 'totalDraws';
  };

  private getStatics = async (id: number) => {
    const finishedMatches = await this.matches.getInProgress(false);

    const staticts = {
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
    };

    finishedMatches.forEach((match: Matches) => {
      if (match.homeTeam === id) {
        const result = this.homeGoals(match);
        staticts[result as winDrawLose] += 1;
      }
    });

    return { ...staticts };
  };

  private getGoals = async (id: number) => {
    const finishedMatches = await this.matches.getInProgress(false);

    let goalsFavor = 0;
    let goalsOwn = 0;
    let totalGames = 0;

    finishedMatches.forEach((match) => {
      if (match.homeTeam === id) {
        goalsFavor += match.homeTeamGoals;
        goalsOwn += match.awayTeamGoals;
        totalGames += 1;
      }
    });

    const goalsBalance = goalsFavor - goalsOwn;

    return { goalsFavor, goalsOwn, totalGames, goalsBalance };
  };

  getAll = async () => {
    const allTeams = await this.teams.getAll();

    const test = allTeams.map(async ({ id, teamName }) => {
      const staticts = await this.getStatics(id);
      const favorOrOwnGoals = await this.getGoals(id);
      const totalPoints = (staticts.totalVictories * 3) + staticts.totalDraws;
      const sum = (totalPoints / (favorOrOwnGoals.totalGames * 3)) * 100;

      const newObj: ILeaderboard = { name: teamName,
        totalPoints,
        ...staticts,
        ...favorOrOwnGoals,
        efficiency: Number(sum.toFixed(2)),
      };

      return newObj;
    });

    return Promise.all(test);
  };
}
