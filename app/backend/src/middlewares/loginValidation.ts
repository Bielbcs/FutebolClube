import { NextFunction, Request, Response } from 'express';
import * as Joi from 'joi';
import ILogin from '../interfaces/ILogin';

export default class LoginValidation {
  private schema: Joi.ObjectSchema<ILogin> = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
  });

  validateLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.schema.validateAsync(req.body);
      next();
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: 'All fields must be filled' });
      }
    }
  };
}
