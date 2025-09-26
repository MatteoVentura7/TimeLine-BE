const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "13579Matteo",
  database: "time-line-db",
});

function connectToDatabase() {
  connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySql");
  });
}

connectToDatabase();

module.exports = connection;
