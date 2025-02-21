import multer from "multer";
import multerConfig from "../config/multer";

import photo from "../models/Photo";

const upload = multer(multerConfig).single("photo");

class Photo {
  create(req, res) {
    upload(req, res, async (err) => {
      if (err) {
        if (err.code === "LIMIT_UNEXPECTED_FILE") {
          return res.status(400).json({
            errors: ["Invalid file type"],
          });
        }
        return res.status(400).json({
          errors: [err.code],
        });
      }

      try {
        const { originalname, filename } = req.file;
        const { student_id } = req.body;
        const newPhoto = await photo.create({
          original_filename: originalname,
          filename,
          student_id,
        });

        return res.json(newPhoto);
      } catch (err) {
        if (err.name === "SequelizeForeignKeyConstraintError") {
          return res.status(400).json({
            errors: ["Student not found"],
          });
        }
        return res.status(400).json({
          errors: [err.message],
        });
      }
    });
  }
}

export default new Photo();
