const { Model, DataTypes, Deferrable } = require("sequelize");
import { test, orm as sequelize } from "./orm";

export class Template extends Model {}

Template.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    ledger: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descr: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,

    paranoid: true,
    // tableName: "tableName",
    // modelName: "modelName",
    timestamps: true,
    indexes: [{ unique: true, fields: ["name","ledger"] }],
  }
);

module.exports = Template;
