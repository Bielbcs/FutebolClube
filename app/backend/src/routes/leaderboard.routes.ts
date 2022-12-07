import * as express from 'express';
import LeaderboardController from '../database/controllers/leaderboard.controller';

const router = express.Router();
const leaderboard = new LeaderboardController();

router.get('/:local', leaderboard.getAllHome);
router.get('/', leaderboard.getAllHome);

export default router;
