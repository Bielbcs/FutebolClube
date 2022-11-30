import * as express from 'express';
import MatchesController from '../database/controllers/matches.controller';
import { verifyEqualTeams, verifyExistentTeams } from '../middlewares/verifyTeams';

const routes = express.Router();

const macthesController = new MatchesController();

routes.get('/', macthesController.getAll);
routes.post('/', verifyEqualTeams, verifyExistentTeams, macthesController.insertMatch);
routes.patch('/:id/finish', macthesController.finishMatch);
routes.patch('/:id', macthesController.updateMatchScore);

export default routes;
