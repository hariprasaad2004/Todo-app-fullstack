const express = require("express");
const router = express.Router();

const {
  addTodo,
  getTodos,
  deleteTodo,
  updateTodo
} = require("../controllers/todoController");


// CREATE
router.post("/", addTodo);

// READ
router.get("/", getTodos);

// DELETE
router.delete("/:id", deleteTodo);

// ubdate

router.put("/:id", updateTodo);

module.exports = router;

