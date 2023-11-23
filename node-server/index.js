const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const connectDatabase = require('./connectDatabase');
const config = require("./config");


const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyparser.json());

connectDatabase();

app.get("/", (req,res) => {
    console.log("Response ok");
    res.send("OK - Server online");
})

app.listen(config.port, () =>
  console.log("Servidor funcionando na porta " + config.port)
);