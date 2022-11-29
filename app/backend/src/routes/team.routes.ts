import * as express from 'express';
import TeamController from '../database/controllers/team.controller';

const router = express.Router();

const teamController = new TeamController();

router.get('/', teamController.getAll);
router.get('/:id', teamController.byId);

export default router;
