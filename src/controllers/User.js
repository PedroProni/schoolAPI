import User from "../models/User";

class UserC {
  async create(req, res) {
    try {
      const newUser = req.body;

      const user = await User.create(newUser);

      return res.status(200).json(user);
    } catch (err) {
      return res
        .status(400)
        .json({ errors: err.errors.map((error) => error.message) });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll();

      return res.status(200).json(users);
    } catch (err) {
      return res.json(null);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      if(!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const { password, password_hash, ...showUser } = user.toJSON();

      return res.status(200).json(showUser);
    } catch (err) {
      return res.json({ errors: err.errors.map((error) => error.message) });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if(!id) {
        return res.status(400).json({ error: 'ID is required' });
      }

      const user = await User.findByPk(id);

      if(!user) {
        return res.status(404).json({ error: 'User not found' });
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
      const { id } = req.params;

      if(!id) {
        return res.status(400).json({ error: 'ID is required' });
      }

      const user = await User.findByPk(id);

      if(!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      await user.destroy();

      return res.status(200).json({ message: 'User deleted' });
    } catch (err) {
      return res.json({ errors: err.errors.map((error) => error.message) });
    }
  }


}

export default new UserC();
