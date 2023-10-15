const { Model, DataTypes, Deferrable } = require("sequelize");
import { test, orm as sequelize } from "./orm";

export class ledgerPartner extends Model {}

ledgerPartner.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
  }
);

module.exports = {
  ledgerPartner,
};
