const mysql = require('mysql');
const dotenv = require('dotenv');

// get config vars
dotenv.config();

let connection;


async function init() {

  connection = mysql.createConnection({
    host: process.env.MYSQLDB_HOST,
    user: process.env.MYSQLDB_USER,
    password: process.env.MYSQLDB_ROOT_PASSWORD,
    port: process.env.MYSQLDB_DOCKER_PORT,
    database: process.env.MYSQLDB_DATABASE
  })

  return new Promise((acc, rej) => {
      connection.query(
        `CREATE DATABASE IF NOT EXISTS ${process.env.MYSQLDB_DATABASE}`,
        error => {
          if(error) return rej(error)
        }
      )
      connection.query(
        'CREATE TABLE IF NOT EXISTS users (email VARCHAR(320), password CHAR(60))',
        err => {
            if (err) return rej(err);
            console.log(`Connected to mysql db at host ${process.env.MYSQLDB_HOST}`);
            acc();
        },
      );
  });
}

async function login() {
  return new Promise((acc, rej) => {
    connection.query(
      'SELECT * FROM users',
      (err, rows) => {
        if(err) return rej(err);
        acc(rows.map(el => {return{email: el.email, password: el.password}}));
      }
    )
  });
}

module.exports = {
  init,
  login
}