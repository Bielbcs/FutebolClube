import { verify, sign } from 'jsonwebtoken';
import { config } from 'dotenv';
import IUser from '../interfaces/IUser';

config();

export default class Token {
  private jwtSecret = process.env.JWT_SECRET as string;

  create = (payload: IUser): string => {
    const token = sign(payload, this.jwtSecret, {
      expiresIn: '1d',
      algorithm: 'HS256',
    });
    return token;
  };

  validate = (token: string): void => verify(token, this.jwtSecret, (err, decoded) => {
    if (err) throw new Error(err.message);
    return decoded?.role;
  });
}
