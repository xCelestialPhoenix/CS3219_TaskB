const mysql = require("mysql");
require('dotenv').config();

var config = {
    user: process.env.SQL_USER,
    database: process.env.SQL_DATABASE,
    password: process.env.SQL_PASSWORD,
    insecureAuth : true
}

if (process.env.INSTANCE_CONNECTION_NAME && process.env.NODE_ENV == "production") {
    config.socketPath = "/cloudsql/" + process.env.INSTANCE_CONNECTION_NAME;
}

var connection = mysql.createConnection(config);

function executeQuery(sql, callback) {

    connection.query(sql, function (error, results, fields) {
        if (error) {
            return callback(error, null);
        } else {
            return callback(null, results);
        }
    });
 }
 
 function query(sql, callback) {
    executeQuery(sql, function (error, data) {
        if (error) {
            return callback(error);
        } else {
            callback(null, data);
        }
    });
 }

 module.exports = {
    query: query,
    connection: connection
 }