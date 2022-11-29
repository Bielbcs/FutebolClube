import { Request, Response } from 'express';
import Token from '../../utils/token';
import LoginService from '../services/login.service';

export default class LoginController {
  constructor(
    private loginService = new LoginService(),
    private token = new Token(),
  ) { }

  login = async (req: Request, res: Response) => {
    try {
      const rest = await this.loginService.login(req.body);
      const token = this.token.create(rest);
      res.status(200).json({ token });
    } catch (err) {
      if (err instanceof Error) return res.status(401).send({ message: err.message });
    }
  };

  validateLogin = async (req: Request, res: Response) => {
    const { authorization } = req.headers;

    try {
      if (authorization) {
        const role = this.token.validate(authorization);
        return res.status(200).json({ role });
      }
    } catch (error) {
      if (error instanceof Error) return res.status(404).send({ message: error.message });
    }
  };
}
