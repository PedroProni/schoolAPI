import User from "../models/User";
import jwt from "jsonwebtoken";

class UserC {
  async create(req, res) {
    try {
      const newUser = req.body;

      const user = await User.create(newUser);

      const { id } = user.toJSON();
      const { email } = user.toJSON();

      const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });

      res.status(201).json({ token: [token] });
    } catch (err) {
      return res
        .status(400)
        .json({ errors: err.errors.map((error) => error.message) });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ["id", "name", "email"] });

      return res.status(200).json(users);
    } catch (err) {
      return res.json(null);
    }
  }

  async show(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(404).json({ errors: ["User not found"] });
      }

      const { password, password_hash, ...showUser } = user.toJSON();

      return res.status(200).json(showUser);
    } catch (err) {
      return res.json({ errors: err.errors.map((error) => error.message) });
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(404).json({ errors: ["User not found"] });
      }

      const updatedUser = await user.update(req.body);

      const { password, password_hash, ...showUser } = updatedUser.toJSON();

      return res.status(200).json(showUser);
    } catch (err) {
      return res.json({ errors: err.errors.map((error) => error.message) });
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(404).json({ errors: ["User not found"] });
      }

      await user.destroy();

      return res.status(200).json(null);
    } catch (err) {
      return res.json({ errors: err.errors.map((error) => error.message) });
    }
  }
}

export default new UserC();
