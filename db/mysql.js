const mysql = require("mysql");

let pool = mysql.createPool(process.env.CLEARDB_DATABASE_URL);

module.exports=pool;