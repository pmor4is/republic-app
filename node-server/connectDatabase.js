const config = require("./config");
const { Client } = require('pg');

const connectDatabase = async () => {
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
            console.log(result.rows[0]);
        });
    })
}

module.exports = connectDatabase;