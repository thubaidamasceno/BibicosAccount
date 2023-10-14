const { Model, DataTypes, Deferrable } = require("sequelize");
import { test, orm as sequelize } from "../orm";

var crypto = require("crypto");
var jwt = require("jsonwebtoken");
var secret = require("../config").config.sessionSecret;

export class User extends Model {
  // declare id: number; // this is ok! The 'declare' keyword ensures this field will not be emitted by TypeScript.

  //function
  validPassword(password) {
    var hash = crypto
      .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
      .toString("hex");
    return this.getDataValue("hash") === hash;
  }

  //function
  setPassword(password) {
    this.setDataValue("salt", crypto.randomBytes(16).toString("hex"));
    this.setDataValue(
      "hash",
      crypto
        .pbkdf2Sync(password, this.getDataValue("salt"), 10000, 512, "sha512")
        .toString("hex")
    );
  }

  //function
  generateJWT() {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    var expi = Math.floor(exp.getTime() / 1000);
    var sign = {
      id: this.getDataValue("id"),
      username: this.getDataValue("username"),
      exp: expi,
    };
    return jwt.sign(sign, secret);
  }

  //function
  toAuthJSON() {
    return {
      username: this.getDataValue("username"),
      token: this.generateJWT(),
      role: this.getDataValue("role"),
    };
  }

  //function
  toProfileJSONFor(user) {
    let r = {
      username: this.getDataValue("username"),
      email: this.getDataValue("email"),
      role: this.getDataValue("role"),
    };
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: 'usernameIndex',
      validate: {
        is: ["^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$", ""],
      },
    },

    email: {
      type: DataTypes.STRING,
      // allowNull:false,
      // unique: 'usernameIndex',
      // validate:{
      //   is: ["\S+@\S+\.\S+",''],
      // }
    },
    hash: {
      type: DataTypes.TEXT,
    },

    salt: {
      type: DataTypes.STRING,
    },
    recover_token: {
      type: DataTypes.STRING,
      default: "guest",
    },
    role: {
      type: DataTypes.STRING,
      default: "guest",
    },
  },
  {
    sequelize,

    paranoid: true,
    tableName: "Users",
    modelName: "User",
    timestamps: true,
    indexes: [
      { unique: true, fields: ["id"] },
      { unique: true, fields: ["username"] },
    ],
  }
);

module.exports = User;
