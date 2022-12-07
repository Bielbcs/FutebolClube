import ITeamsBody from '../../interfaces/ITeamsBody';
import Matches from '../models/Matches';

export default class MatchesService {
  getAll = async () => {
    const matches = await Matches.findAll({ include: [
      { association: 'teamHome', attributes: ['teamName'] },
      { association: 'teamAway', attributes: ['teamName'] },
    ] });

    return matches;
  };

  getInProgress = async (inProgress: boolean): Promise<Matches[]> => {
    const matches = await Matches.findAll({ where: { inProgress },
      include: [
        { association: 'teamHome', attributes: ['teamName'] },
        { association: 'teamAway', attributes: ['teamName'] },
      ],
    });
    return matches;
  };

  insertMatch = async (body: ITeamsBody): Promise<Matches> => {
    const newObj = { ...body, inProgress: true };

    const { dataValues } = await Matches.create(newObj);

    return dataValues;
  };

  finishMatch = async (id: number): Promise<void> => {
    await Matches.update({ inProgress: false }, { where: { id } });
  };

  updateMatchScore = async (id: number, newScores: ITeamsBody): Promise<void> => {
    const { homeTeamGoals, awayTeamGoals } = newScores;
    await Matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  };
}
