const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./db");

const PORT = 5000;

app.use(express.json());
app.use(bodyParser.json());

db.pool.query(
  `CREATE TABLE lists (id INTERGER AUTO_INCREMENT, value TEXT, PRIMARY KEY (id))`,
  (error, results, fields) => {
    console.log(results);
  }
);
app.get("/api/values", function (req, res, next) {
  db.pool.query("SELECT * FROM lists;", function (error, results, fields) {
    if (error) return res.status(500).send(error);
    else return res.json(results);
  });
});

app.post("/api/values", function (req, res, next) {
  db.pool.query(
    `INSERT INTO lists (value) VALUES ("${req.body.value}");`,
    (error, results, fields) => {
      if (error) return res.status(500).send(error);
      else return res.json({ sucess: true, value: req.body.value });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
