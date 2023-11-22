const express = require('express');
const cors = require('cors');
const bodyparser = require('bodyparser');
const config = require("./config");
const { Client } = require('pg');

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyparser.json());

var conString = config.urlConnection;
var client = new Client(conString);

client.connect(function (err) {
    if (err) {
        return console.error('Unable to connect to database. Error: ',err);
    }
    client.query('SELECT NOW()', function (err, result) {
        if (err) {
            return console.error('Error executing the query. Error: ',err);
        }
        console.log(result.row[0]);
    });
})