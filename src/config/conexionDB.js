const Pool = require('pg').Pool

require('dotenv').config(); 
/*  
const pool = new Pool({
    user: process.env.USER_DATABASE,
    host: process.env.HOST_DATABASE,
    database: process.env.NAME_DATABASE,
    password:  process.env.PASSWORD_DATABASE,
    port: 5432,
})

module.exports = pool; */

const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.NAME_DATABASE,process.env.USER_DATABASE, process.env.PASSWORD_DATABASE, {
  host: process.env.HOST_DATABASE,
  dialect: 'postgres'
});

module.exports = sequelize;