import ITeamsBody from '../../interfaces/ITeamsBody';
import Matches from '../models/Matches';

export default class MatchesService {
  getAll = async () => {
    const matches = await Matches.findAll({ include: [
      { association: 'teamHome', attributes: { exclude: ['id'] } },
      { association: 'teamAway', attributes: { exclude: ['id'] } },
    ] });

    return matches;
  };

  getInProgress = async (inProgress: boolean) => {
    const matches = await Matches.findAll({ where: { inProgress },
      include: [
        { association: 'teamHome', attributes: { exclude: ['id'] } },
        { association: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  };

  insertMatch = async (body: ITeamsBody) => {
    const newObj = { ...body, inProgress: true };

    const { dataValues } = await Matches.create(newObj);

    return dataValues;
  };

  finishMatch = async (id: number) => {
    await Matches.update({ inProgress: false }, { where: { id } });
  };

  updateMatchScore = async (id: number, newScores: ITeamsBody) => {
    const { homeTeamGoals, awayTeamGoals } = newScores;
    await Matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  };
}
