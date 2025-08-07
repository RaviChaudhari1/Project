import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [task, setTask] = useState("");
  const [placeholder, setPlaceholder] = useState("Add a new task...");

  /*
   - as the page reloads, this useState will be called and todos will be initialized to an empty array. so no todos will be shown.

  const [todos, setTodos] = useState([]);
  */
  //  Initialize todos from localStorage directly

  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    console.log("Saving todos:", todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (task.trim() === "") {
      setPlaceholder("Please enter a task");
      return;
    }
    setTodos((prevTodos) => [
      { id: uuidv4(), text: task, isCompleted: false },
      ...prevTodos,
    ]);
    setTask("");
    setPlaceholder("Add a new task...");
  };

  const handleAdd = () => addTodo();

  const handleEnter = (e) => {
    if (e.key === "Enter") addTodo();
  };

  const handleEdit = (e, id) => {
    let taskId = id;
    let index = todos.findIndex((todo) => todo.id === taskId);
    setTask(todos[index].text);
    let newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };
  const handleDelete = (e, id) => {
    let newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleChange = (e) => {
    setTask(e.target.value);
    setPlaceholder("Add a new task...");
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(updatedTodos);
  };

  // const handleCheckbox = (e) => {
  //   let id = e.target.name;
  //   let index = todos.findIndex((todo) => todo.id === id);
  //   let updatedTodos = [...todos];
  //   updatedTodos[index].isCompleted = !updatedTodos[index].isCompleted;
  //   setTodos(updatedTodos);
  // };

  return (
    <div className="app">
      <Navbar />
      <div className="todo-container">
        <h1 className="todo-title">Todo List</h1>
        <div className="todo-input">
          <input
            onKeyDown={(e) => {
              handleEnter(e);
            }}
            onChange={handleChange}
            value={task}
            type="text"
            placeholder={placeholder}
          />
          <button onClick={handleAdd} className="add-button">
            Add
          </button>
        </div>
        <div className="todo-list">
          {todos.length === 0 && <p className="no-tasks">Add your tasks.</p>}
          {todos.map((todo) => {
            return (
              <div className="todo-task" key={todo.id}>
                <input
                  checked={todo.isCompleted}
                  type="checkbox"
                  name={todo.id}
                  onChange={handleCheckbox}
                />
                <span
                  id="task-text"
                  className={todo.isCompleted ? "line-through" : ""}
                >
                  {todo.text}
                </span>
                <button
                  onClick={(e) => {
                    handleEdit(e, todo.id);
                  }}
                  className="edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    handleDelete(e, todo.id);
                  }}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
