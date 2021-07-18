const express = require("express");
const app = express();
const port = 8030;
const knex = require("knex");
const db = knex({
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: "",
    database: "gleam_todo",
  },
});

app.get("/todo-list", (req, res) => {
  db("todos").then(result => res.status(200).send({ result: result }));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
