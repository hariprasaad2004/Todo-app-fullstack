const Todo = require("../models/Todo");

// ADD TODO
exports.addTodo = async (req, res) => {
  const todo = new Todo(req.body);
  await todo.save();
  res.json(todo);
};

// GET TODOS
exports.getTodos = async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
};

// DELETE TODO
exports.deleteTodo = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.send("Deleted");
};