const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const config = require("./config");
const client = require('./database/database.js');

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyparser.json());

const marketRoute = require('./routes/market');
const infrastructureRoute = require('./routes/infrastructure');

app.use("/market", marketRoute);
app.use("/infrastructure", infrastructureRoute);

app.get("/", (req, res) => {
  console.log("Response ok");
  res.send("OK - Server online");
});


app.listen(config.port, () =>
  console.log("Servidor funcionando na porta " + config.port)
);
module.exports = app;