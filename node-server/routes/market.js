const express = require('express');
const router = express.Router();
const client = require('../database/database');


router.get("/", (req, res) => {
    try {
      console.log("Query GET requisition");
      client.query("SELECT * FROM market", function (error, result) {
        if (error) {
          return console.log("Error executing SELECT ALL query. Error: " + error);
        }
        res.send(result.rows);
        console.log("Query GET executed successfully");
        // client.release();
      });

    } catch (error) {
      console.log(error);
    }
  });
  

router.get("/:id", (req, res) => {
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

router.post("/", (req, res) => {
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

router.delete("/:id", (req, res) => {
    try {
        console.log("Query DELETE/" + req.params.id + " requisition");
        const id = req.params.id;
        client.query(
            "DELETE FROM market WHERE id = $1",
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

router.put("/:id", (req, res) => {
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

module.exports = router;