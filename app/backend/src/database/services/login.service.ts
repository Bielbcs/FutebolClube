import * as bcrypt from 'bcryptjs';
import ILogin from '../../interfaces/ILogin';
import User from '../models/User';

export default class LoginService {
  login = async (body: ILogin) => {
    const { email } = body;
    const user = await User.findOne({ where: { email } });
    if (user) {
      const { password, ...rest } = user.dataValues;
      const result = (bcrypt.compareSync(body.password, password));
      if (result) {
        return rest;
      }
    }
    throw new Error('Incorrect email or password');
  };
}
