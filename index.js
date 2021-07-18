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

const cors = require("cors");
app.use(cors());

app.use(express.json());

app.get("/todo-list", (req, res) => {
  db("todos").then(result => res.status(200).send({ result: result }));
});

app.post("/todo-list", (req, res) => {
  const { todoItem, refId, initialTime, editTime } = req.body;
  db("todos")
    .insert({
      item: todoItem,
      ref_id: refId,
      inital_date: initialTime,
      final_edit_date: editTime,
    })
    .then(response => {
      res.status(200).send("리스트에 등록 되었습니다.");
    })
    .catch(error => {
      console.error(error);
      res.status(500).send("실패했습니다.");
    });

  app.put("/todo-list", (req, res) => {
    const { todoItem, refId, initialTime, editTime } = req.body;
    db("todos")
      .where({ id: req.body.id })
      .update({
        item: todoItem,
        ref_id: refId,
        inital_date: initialTime,
        final_edit_date: editTime,
      })
      .then(response => {
        res.status(200).send("리스트가 수정 되었습니다.");
      })
      .catch(error => {
        console.error(error);
        res.status(500).send("실패했습니다.");
      });
  });
  app.delete("/todo-list", (req, res) => {
    db("todos")
      .where({ id: req.body.id })
      .del()
      .then(response => {
        res.status(200).send("리스트에서 삭제 되었습니다.");
      })
      .catch(error => {
        console.error(error);
        res.status(500).send("실패했습니다.");
      });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
