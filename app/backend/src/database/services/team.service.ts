import Teams from '../models/Teams';

export default class TeamService {
  getAll = async () => {
    const allTeams = await Teams.findAll();

    return allTeams;
  };

  byId = async (id: number) => {
    const team = await Teams.findByPk(id);

    return team;
  };
}
