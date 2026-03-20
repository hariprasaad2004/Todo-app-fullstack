const Todo = require("../models/Todo");

// ADD TODO
exports.addTodo = async (req, res) => {
  const { task } = req.body;

  const newTodo = await Todo.create({
    task,
    completed: false
  });

  res.json(newTodo);
};

// GET TODOS
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.log(error); // 
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE TODO
exports.deleteTodo = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.send("Deleted");
};


//ubdate 

exports.updateTodo = async (req, res) => {
  const { id } = req.params;

  const todo = await Todo.findById(id);

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  todo.completed = !todo.completed;

  await todo.save();

  res.json(todo);
  console.log("ID RECEIVED:", id);
};
