const { Model, DataTypes, Deferrable } = require("sequelize");
import { test, orm as sequelize } from "./orm";

export class Operation extends Model {}

Operation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    author: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    template: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    brief: {
      type: DataTypes.STRING,
      allowNull: false,
      comment:'Descrição breve sobre a operação'
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    _initialDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    _finishDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    _positiveEntries: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      default: 0.,
    },
    _negativeEntries: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      default: 0.,
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

module.exports = Operation;
