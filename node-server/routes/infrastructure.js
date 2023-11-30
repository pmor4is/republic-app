
const config = require("../config");
const { Client } = require('pg');

const express = require('express');
const router = express.Router();

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


router.get("/", (req, res) => {
    try {
        console.log("Query GET requisition");
        client.query("SELECT * FROM infrastructure", function (error, result) {
            if (error) {
                return console.log("Error executing SELECT ALL query from infrastructure. Error: " + error);
            }
            res.send(result.rows);
            console.log("Query GET executed successfully");
        });
    } catch (error) {
        console.log(error);
    }
});

router.get("/:id", (req, res) => {
    try {
        console.log("Query GET/" + req.params.id + " requisition");
        client.query(
            "SELECT * FROM infrastructure WHERE id = $1",
            [req.params.id],
            function (error, result) {
                if (error) {
                    return console.log("Error executing SELECT ${id} query from infrastructure. Error: " + error);
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

router.delete("/:id", (req, res) => {
    try {
        console.log("Query DELETE/" + req.params.id + " requisition");
        const id = req.params.id;
        client.query(
            "DELETE FROM infrastructure WHERE id = $1",
            [id],
            function (error, result) {
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

router.post("/", (req, res) => {
    try {
        console.log("Query POST requisition", req.body);
        const { repairName, repairDescription, repairLocal, repairPriority, repairObservations, repairLimitDate } = req.body;
        client.query(
            "INSERT INTO infrastructure (repairName, repairDescription, repairLocal, repairPriority, repairObservations, repairLimitDate) VALUES ($1, $2, $3, $4, $5, $6) RETURNING * ",
            [repairName, repairDescription, repairLocal, repairPriority, repairObservations, repairLimitDate],
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

router.put("/:id", (req, res) => {
    try {
        console.log("Query PUT requisition", req.body);
        const id = req.params.id;
        const { repairName, repairDescription, repairLocal, repairPriority, repairObservations, repairLimitDate } = req.body;
        client.query(
            "UPDATE infrastructure SET repairName=$1, repairDescription=$2, repairLocal=$3, repairPriority=$4, repairObservations=$5, repairLimitDate=$6 WHERE id=$7",
            [repairName, repairDescription, repairLocal, repairPriority, repairObservations, repairLimitDate, id],
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

module.exports = router;