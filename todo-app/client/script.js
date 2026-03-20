const API = "https://learning-node-and-express.onrender.com/api/todos";

// ADD TODO
async function addTodo() {
  const task = document.getElementById("task").value;

  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ task })
  });

  document.getElementById("task").value = "";
  loadTodos();
}

// LOAD TODOS
async function loadTodos() {
  const res = await fetch(API);
  const data = await res.json();

  const list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach(todo => {
    const li = document.createElement("li");

    li.innerHTML = `
  ${todo.task} - ${todo.completed ? "Done" : "Pending"}
  
  <button onclick="toggleTodo('${todo._id}')">
    ${todo.completed ? "Undo" : "Complete"}
  </button>

  <button onclick="deleteTodo('${todo._id}')">Delete</button>
`;

    list.appendChild(li);
  });
  
}

// DELETE TODO
async function deleteTodo(id) {
  await fetch(API + "/" + id, {
    method: "DELETE"
  });

  loadTodos();
}
async function toggleTodo(id) {
  await fetch(API + "/" + id, {
    method: "PUT"
  });

  loadTodos();
}
// Load when page opens
loadTodos();