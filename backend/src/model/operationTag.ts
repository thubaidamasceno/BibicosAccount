const { Model, DataTypes, Deferrable } = require("sequelize");
import { test, orm as sequelize } from "./orm";

export class OperationTag extends Model {}

OperationTag.init(
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
    indexes: [{ unique: true, fields: ["name"] }],
  }
);

module.exports = OperationTag;
