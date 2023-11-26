const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
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
    return console.error('Unable to connect to database. Error: ', err);
  }
  client.query('SELECT NOW()', function (err, result) {
    if (err) {
      return console.error('Error executing the query. Error: ', err);
    }
    console.log(result.rows[0]);
  });
})

app.get("/", (req, res) => {
  console.log("Response ok");
  res.send("OK - Server online");
});

app.get("/market", (req, res) => {
  try {
    console.log("Query GET requisition");
    client.query("SELECT * FROM market", function (error, result) {
      if (error) {
        return console.log("Error executing SELECT ALL query. Error: " + error);
      }
      res.send(result.rows);
      console.log("Query GET executed successfully");
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/market/:id", (req,res) => {
  try {
    console.log("Query GET/" + req.params.id + " requisition");
    client.query(
      "SELECT * FROM market WHERE id = $1", 
      [req.params.id],
      function (error, result) {
        if (error) {
          return console.log("Error executing SELECT ${id} query. Error: " + error);
        }
        if (result.rowCount == 0) {
          res.send("User not found");
        } else {
          res.send(result.rows);
          console.log("Query GET/" + req.params.id + " successfully");
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

app.delete("/market/:id" , (req,res) => {
  try {
    console.log("Query DELETE/" + req.params.id + " requisition");
    const id = req.params.id;
    client.query(
      "DELETE FROM market WHERE id = $1",
      [id],
      function(error, result) {
        if (error) {
          return console.log("Error executing DELETE ${id} query. Error: " + error);
        } else {
          if (result.rowCount == 0) {
            res.status(400).json({ info: "User not found" });
          } else {
            res.status(200).json({ info: "User successfully deleted" });
          }
        }
        console.log("Query DELETE successfully");
      }
    )
  } catch (error) {
    console.log(error);
  }
});

app.post("/market", (req,res) => {
  try {
    console.log("Query POST requisition", req.body);
    const { productName, productDescription, productQuantity } = req.body;
    client.query(
      "INSERT INTO market (productName, productDescription, productQuantity) VALUES ($1, $2, $3) RETURNING * ",
      [productName, productDescription, productQuantity],
      function (error, result) {
        if (error) {
          return console.log("Error executing INSERT query. Error: " + error);
        } 
        const { id } = result.rows[0];
        res.setHeader("id", '${id}');
        res.status(201).json(result.rows[0]);
        console.log("Query INSERT successfully.");
      }
    );
  } catch (error) {
    console.log(error);
  } 
});

app.put("/market/:id", (req,res) => {
  try {
    console.log("Query PUT requisition", req.body);
    const id = req.params.id;
    const { productName, productDescription, productQuantity } = req.body;
    client.query(
      "UPDATE market SET productName=$1, productDescription=$2, productQuantity=$3 WHERE id=$4",
      [productName, productDescription, productQuantity, id],
      function (error, result) {
        if (error) {
          return console.log("Error executing UPDATE query. Error: " + error);
        } else {
          res.setHeader("id", id);
          res.status(202).json({ identifier: id });
          console.log("Query UPDATE successfully.");
        }
      }
    )
  } catch (error) {
    console.log(error);
  }
});

app.listen(config.port, () =>
  console.log("Servidor funcionando na porta " + config.port)
);
// module.exports = app;