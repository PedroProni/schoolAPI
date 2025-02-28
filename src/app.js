import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

import './database';

import express from 'express';
import home from './routes/home';
import user from './routes/user';
import token from './routes/token';
import student from './routes/student';
import photo from './routes/photo';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use('/images/', express.static(path.resolve(__dirname, '..', 'uploads', 'images')));
  }

  routes() {
    this.app.use("/", home);
    this.app.use("/users/", user);
    this.app.use("/tokens/", token);
    this.app.use("/students/", student);
    this.app.use("/photos/", photo);
  }
}

export default new App().app;
