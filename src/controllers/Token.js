import User from '../models/User';
import jwt from 'jsonwebtoken';

class Token {
  async create(req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) {
      return res.status(401).json({ errors: ['Invalid credentials'] });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ errors: ['User not found'] });
    }

    if (!(await user.passwordIsValid(password))) {
      return res.status(401).json({ errors: ['Invalid password'] });
    }

    const { id } = user;

    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    res.status(201).json({ token: [token]});
  }
}

export default new Token();
