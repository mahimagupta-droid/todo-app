import { useState, useEffect } from "react";
import "./App.css";

type todoTypes = {
  _id: string;
  title: string;
  status: string;
};

export default function App() {
  const [todos, setTodos] = useState<todoTypes[]>([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [editing, setEditing] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState("");
  const [error, setError] = useState("");

  const fetchTodos = async () => {
    const response = await fetch("http://localhost:3000/todo");
    if (response.ok) {
      const reqBody = await response.json();
      setTodos(reqBody);
      setError("")
    } else {
      setError(response.statusText)
    }
  };

  const postTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        status,
      }),
    });
    if (response.ok) {
      fetchTodos();
      setTitle("");
      setStatus("");
    } else {
      console.log("error: ", response.status, response.statusText)
    }
  };

  const deleteTodo = async (id: string) => {
    const response = await fetch(`http://localhost:3000/todo/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
        fetchTodos();
    } else {
      console.log("error: ", response.status, response.statusText)
    }
  };

  const updateTodo = async (id: string) => {
    const response = await fetch(`http://localhost:3000/todo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        status,
      }),
    });
    if (response.ok) {
        fetchTodos();
    } else {
      console.log("error: ", response.status, response.statusText)
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (editing == true) {
    return (
      <div style={{ marginTop: "2px" }}>
        <form onSubmit={() => updateTodo(editingTodoId)}>
          <div>
            <input
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              id="title"
              value={title}
            />
            <label>Title</label>
          </div>
          <div>
            <input
              onChange={(e) => {
                setStatus(e.target.value);
              }}
              id="status"
              value={status}
            />
            <label>Status</label>
          </div>
          <button type="submit">UPDATE</button>
        </form>
      </div>
    );
  }

  if(error) {
    return <p>{error}</p>
  }

  return (
    <div>
      <div>
        <h1>Todo app</h1>
        <h2>Get requests</h2>
        {todos.map((todo) => (
          <div className="todo" key={todo._id}>
            <p>title: {todo.title}</p>
            <p>status: {todo.status}</p>
            <button
              onClick={() => {
                deleteTodo(todo._id);
              }}
            >
              DELETE
            </button>
            <button
              onClick={() => {
                setEditing(true);
                setEditingTodoId(todo._id);
              }}
            >
              UPDATE
            </button>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "2px" }}>
        <form onSubmit={postTodo}>
          <div>
            <input
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              id="title"
              value={title}
            />
            <label>Title</label>
          </div>
          <div>
            <input
              onChange={(e) => {
                setStatus(e.target.value);
              }}
              id="status"
              value={status}
            />
            <label>Status</label>
          </div>
          <button type="submit">POST</button>
        </form>
      </div>
    </div>
  );
}
