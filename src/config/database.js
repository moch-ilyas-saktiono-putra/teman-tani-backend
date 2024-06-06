// myql connection pool
const mysql = require("mysql2");

const dbPool = mysql.createPool({
  host: "localhost",
  user: "root",
  //   password: "root",
  database: "teman_tani",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = dbPool.promise();
