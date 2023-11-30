// db.js
const { Client } = require('pg');
const config = require("../config");

const conString = config.urlConnection;
const client = new Client(conString);

client.connect(function (err) {
  if (err) {
    return console.error('Unable to connect to database. Error: ', err);
  } client.query('SELECT NOW()', function (err, result) {
    if (err) {
      return console.error('Error executing the query. Error: ', err);
    }
    console.log('Connected to the database');
    console.log(result.rows[0]);
  });
});

module.exports = client;
