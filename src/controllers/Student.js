import Student from "../models/Student";

class StudentC {
  async index(req, res) {
    const students = await Student.findAll();

    res.status(200).json(students);
  }

  async show(req, res) {

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ errors: ["ID is required"] });
    }

    const student = await Student.findByPk(id);
    if (!student) {
      return res.status(404).json({ errors: ["Student not found"] });
    }

    res.status(200).json(student);
  }

  async create(req, res) {
    try {
      const student = await Student.create(req.body);

      return res.status(200).json(student);
    } catch (err) {
      return res.status(400).json({ errors: err.errors.map((error) => error.message) });
    }
  }

  async update(req, res) {
    try {

      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ errors: ["ID is required"] });
      }

      const student = await Student.findByPk(id);

      if (!student) {
        return res.status(404).json({ errors: ["Student not found"] });
      }

      const updatedStudent = await student.update(req.body);

      return res.status(200).json(updatedStudent);
    } catch (err) {
      return res.status(400).json({ errors: err.errors.map((error) => error.message) });
    }
  }

  async delete(req, res) {
    try {

      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ errors: ["ID is required"] });
      }

      const student = await Student.findByPk(id);

      if (!student) {
        return res.status(404).json({ errors: ["Student not found"] });
      }

      await student.destroy();

      return res.status(200).json({ message: ["Student deleted"] });
    } catch (err) {
      return res.status(400).json({ errors: err.errors.map((error) => error.message) });
    }
  }
}

export default new StudentC();
