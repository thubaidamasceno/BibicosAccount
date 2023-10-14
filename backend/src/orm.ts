
const { Model, DataTypes, Deferrable ,Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
export const orm = new Sequelize(
  'bbacc_dev',//'database',
   'postgres',//'username',
   process.env.DB_PASSWORD_MAIN || "",//'password',
    {
  host: process.env.IP_POSTGRES || "bbacc_postgres",
  dialect: 'postgres'/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 
  'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

export async function test( ){
    try {
      await orm.authenticate();
      console.log('Connection has been established successfully.');
      return true;
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      return false;
    }}

export async function sync() {
        await orm.sync({ alter: true });
        // Code here
      };
    
// module.exports = orm;
// export default orm;