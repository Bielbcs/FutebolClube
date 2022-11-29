import * as express from 'express';
import LoginValidation from '../middlewares/loginValidation';
import LoginController from '../database/controllers/login.controller';

const router = express.Router();

const loginController = new LoginController();
const validation = new LoginValidation();

router.post('/', validation.validateLogin, loginController.login);

router.get('/validate', loginController.validateLogin);

export default router;
