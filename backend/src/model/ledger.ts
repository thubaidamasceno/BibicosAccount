const { Model, DataTypes, Deferrable } = require("sequelize");
import { test, orm as sequelize } from "./orm";

export class Ledger extends Model {}

// Livro contábil

Ledger.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descr: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    owner: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,

    paranoid: true,
    // tableName: "tableName",
    // modelName: "modelName",
    timestamps: true,
    indexes: [
      { unique: true, fields: ["nome","owner"] },
    ],
  }
);

module.exports = Ledger;
