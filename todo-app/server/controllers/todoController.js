const Todo = require("../models/Todo");

// ADD TODO
exports.addTodo = async (req, res) => {
  try {
    const { task } = req.body;

    const newTodo = await Todo.create({
      task,
      completed: false
    });

    res.json(newTodo);
  } catch (error) {
    console.log("❌ ADD ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

// GET TODOS
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.log("❌ GET ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

// DELETE TODO
exports.deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.send("Deleted");
  } catch (error) {
    console.log("❌ DELETE ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

// UPDATE TODO
exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todo.completed = !todo.completed;

    await todo.save();

    res.json(todo);
  } catch (error) {
    console.log("❌ UPDATE ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};