import * as express from 'express';
import LeaderboardController from '../database/controllers/leaderboard.controller';

const router = express.Router();
const leaderboard = new LeaderboardController();

router.get('/home', leaderboard.getAll);

export default router;
