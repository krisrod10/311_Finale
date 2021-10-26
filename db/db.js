let mysql = require("mysql");
require("dotenv").config();

let connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT
});

connection.connect();

connection.query("use " + process.env.MYSQL_DATABASE, function (error, rows) {
    if (error) {
        console.log("DB Querry error");
        console.log(error);
    } else {
        console.log("Query results", rows);
    }
});


module.exports = connection;