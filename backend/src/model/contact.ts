const { Model, DataTypes, Deferrable } = require("sequelize");
import { test, orm as sequelize } from "./orm";

export class Contact extends Model {}

Contact.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,

    paranoid: true,
    // tableName: "tableName",
    // modelName: "modelName",
    timestamps: true,
  }
);

module.exports = Contact;
