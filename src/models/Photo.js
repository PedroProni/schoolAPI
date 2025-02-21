import Sequelize, { Model } from 'sequelize';
import app from '../config/app';


export default class Photo extends Model {
  static init(sequelize) {
    super.init(
      {
        original_filename: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "original_filename cannot be empty",
            },
          },
        },
        filename: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "filename cannot be empty",
            },
          },
        },
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${app.url}/images/${this.getDataValue("filename")}`;
          },
        },
      },
      {
        sequelize,
        tableName: "photos",
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: "student_id" });
  }
}
