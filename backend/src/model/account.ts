const { Model, DataTypes, Deferrable } = require("sequelize");
import { test, orm as sequelize } from "./orm";

export const accountType = {
  ativo: { id: 0 },
  passivo: { id: 1 },
  receita: { id: 2 },
  despesa: { id: 3 },
  patrimonio: { id: 4 },
};

export class Account extends Model {}

Account.init(
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
    descr: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ledger: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullCod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parent: {
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
    indexes: [{ unique: true, fields: ["name"] }],
  }
);

export class accountBalance extends Model {}
accountBalance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
 
    account: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    value: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    autor: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    indexes: [{ unique: true, fields: ["account","date"] }],
  }
);


module.exports = {
   Account, accountType };
