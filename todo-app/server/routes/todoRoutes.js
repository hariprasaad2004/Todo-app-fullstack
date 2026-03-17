const express = require("express");
const router = express.Router();

const {
  addTodo,
  getTodos,
  deleteTodo
} = require("../controllers/todoController");

// CREATE
router.post("/", addTodo);

// READ
router.get("/", getTodos);

// DELETE
router.delete("/:id", deleteTodo);

module.exports = router;