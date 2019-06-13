const express = require("express");
const app = express();
const port = 5050;
const mysql = require("mysql");
const connection = require("./conf.js");
const cors = require("cors");

app.use(cors());

connection.connect();

app.get("/api/parionssport-foot", (req, res) => {
  connection.query("SELECT * from ps_flux", (err, results) => {
    if (err) {
      res.status(500).send("Erreur lors de la récupération des employés");
    } else {
      res.json(results);
    }
  });
});

app.listen(port, err => {
  if (err) {
    throw new Error("Something bad happened...");
  }

  console.log(`Server is listening on ${port}`);
});
