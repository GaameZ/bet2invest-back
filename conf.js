const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "toto",
  database: "mydb"
});
module.exports = connection;
