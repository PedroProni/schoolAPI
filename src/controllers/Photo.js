class Photo {
  async create(req, res) {
    res.json(req.file);
  }
}

export default new Photo();
