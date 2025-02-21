import multer from "multer";
import multerConfig from "../config/multer";

const upload = multer(multerConfig).single("photo");


class Photo {
  async create(req, res) {
    upload(req, res, (err) => {
      if (err) {
        if(err.code === "LIMIT_UNEXPECTED_FILE") {
          return res.status(400).json({
            errors: ["Invalid file type"],
          });
        }
        return res.status(400).json({
          errors: [err.code],
        });
      }

      return res.json(req.file);
    });
  }
}

export default new Photo();
