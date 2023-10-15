const { Model, DataTypes, Deferrable } = require("sequelize");
import { test, orm as sequelize } from "./orm";

export class Entry extends Model {}

Entry.init(
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
    dueDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    author: {
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
    // indexes: [{ unique: true, fields: ["name"] }],
  }
);

module.exports = Entry;
