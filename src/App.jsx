import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css"; // Import CSS file

const Header = () => <header className="header">To-Do App</header>;
const Footer = () => <footer className="footer">Developed by Ayush</footer>;

const App = () => {
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const addOrUpdateTodo = () => {
    if (task.trim()) {
      if (editId) {
        dispatch({ type: "UPDATE_TODO", payload: { id: editId, text: task } });
        setEditId(null); // Clear edit mode
      } else {
        dispatch({
          type: "ADD_TODO",
          payload: { id: Date.now(), text: task, completed: false },
        });
      }
      setTask(""); // Clear input
    }
  };

  const deleteTodo = (id) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  const toggleTodo = (id) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  };

  const editTodo = (todo) => {
    setTask(todo.text);
    setEditId(todo.id);
  };

  return (
    <div className="container">
      <Header />
      <div className="todo-container">
        <h2>📝 Manage Your Tasks</h2>
        <div className="input-container">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task..."
            className="input-field"
          />
          <button onClick={addOrUpdateTodo} className="add-button">
            {editId ? "Update" : "Add"}
          </button>
        </div>

        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <span
                onClick={() => toggleTodo(todo.id)}
                className={todo.completed ? "completed" : ""}
              >
                {todo.text}
              </span>
              <button onClick={() => editTodo(todo)} className="edit-button">
                ✏️
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="delete-button"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default App;
