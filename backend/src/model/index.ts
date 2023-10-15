// export const { User } = require( "./user");
// export const { Account,accountBalance, accountType } = require("./account");
// export const { Contact } = require( "./contact");
// export const { Ledger } = require( "./ledger");
// export const { Operation } = require( "./operation");
// export const { Template } = require( "./template");
// export const { OperationTag } = require( "./operationTag");
// export const relations = require( "./relations");
// export const { Entry } = require( "./entry");
import { orm, sync ,test} from "./orm";

const { User } = require( "./user");
const { Account,accountBalance, accountType } = require("./account");
const { Contact } = require( "./contact");
const { Ledger } = require( "./ledger");
const { Operation } = require( "./operation");
const { Template } = require( "./template");
const { OperationTag } = require( "./operationTag");
const relations = require( "./relations");
const { Entry } = require( "./entry");

// import User from "./user";
// import { Account,accountBalance, accountType } from "./account";
// import { Contact } from "./contact";
// import { Ledger } from "./ledger";
// import { Operation } from "./operation";
// import { Template } from "./template";
// import { OperationTag } from "./operationTag";
// import * as  relations from "./relations";
// import { Entry } from "./entry";

module.exports = {
  orm,
  sync,
  test,
  ...orm.models,
  accountType,
  relations,
  }


