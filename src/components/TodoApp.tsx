import React, { useState, useEffect } from "react";
import { FaCheck, FaTimes, FaPencilAlt } from "react-icons/fa";
import "../App.css";

type Todo = {
  id: number;
  task: string;
  isCompleted: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState<string>("");
  const [editId, setEditId] = useState<number | null>(null); // Track the ID of the todo being edited
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]); // Track filtered todos

  useEffect(() => {
    // Initialize filteredTodos with all todos when the component mounts or when todos change
    setFilteredTodos(todos);
  }, [todos]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // check if the value is empty
    if (task.trim().length === 0) {
      alert("Please enter a value!");
      return;
    }

    // If editId is not null, update the existing todo
    if (editId !== null) {
      const updatedTodos = todos.map((todo) =>
        todo.id === editId ? { ...todo, task } : todo
      );
      setTodos(updatedTodos);
      setTask("");
      setEditId(null);
      return;
    }

    // create a new todo
    const todo: Todo = {
      id: Date.now(),
      task: task,
      isCompleted: false,
    };

    // add todo to the state
    setTodos([todo, ...todos]);

    // clear the value of task
    setTask("");
  };

  const handleChangeChecked = (todo: Todo) => {
    // update the todo
    const updatedTodos = todos.map((t) =>
      t.id === todo.id ? { ...t, isCompleted: !t.isCompleted } : t
    );

    // update the state
    setTodos(updatedTodos);
  };

  const handleDelete = (id: number) => {
    // filter out the todo to be deleted
    const updatedTodos = todos.filter((todo) => todo.id !== id);

    // update the state
    setTodos(updatedTodos);
  };

  const handleClearCompleted = () => {
    // filter out completed todos
    const updatedTodos = todos.filter((todo) => !todo.isCompleted);

    // update the state
    setTodos(updatedTodos);
  };

  const handleFilter = (filterType: string) => {
    switch (filterType) {
      case "all":
        // Show all todos
        setFilteredTodos([...todos]); // Reset to the original list
        break;
      case "active":
        // Show active todos
        const activeTodos = todos.filter((todo) => !todo.isCompleted);
        setFilteredTodos(activeTodos); // Set filtered todos
        break;
      case "completed":
        // Show completed todos
        const completedTodos = todos.filter((todo) => todo.isCompleted);
        setFilteredTodos(completedTodos); // Set filtered todos
        break;
      default:
        break;
    }
  };

  const handleEdit = (id: number, task: string) => {
    setEditId(id); // Set the todo ID being edited
    setTask(task); // Set the task to edit
  };

  return (
    <div className="content">
      <div className="centered-box">
        <div className="container">
        <h1>📝 TODO - APP</h1>
          <div className="input-box">
            <form onSubmit={handleFormSubmit} className="form">
              <input
                type="text"
                name="task"
                value={task}
                onChange={handleInput}
                placeholder="Enter a new task"
                className="input"
              />
              <button type="submit" className="add-task-btn">
                {editId !== null ? <FaPencilAlt /> : <FaCheck />}
              </button>
            </form>
          </div>
          <div className="todo-list-box">
            <ul className="todo-list">
              {filteredTodos.map((todo) => (
                <li
                  key={todo.id}
                  className={todo.isCompleted ? "completed" : ""}
                >
                  <div className="todo-item">
                  <input
                      type="checkbox"
                      checked={todo.isCompleted}
                      onChange={() => handleChangeChecked(todo)}
                      className="checkbox"
                      id={"checkbox-" + todo.id}
                    />
                    <label
                      htmlFor={"checkbox-" + todo.id}
                      className="tick"
                    ></label>


                    {editId === todo.id ? (
                      // Render input field for editing
                      <input
                        type="text"
                        value={task}
                        onChange={handleInput}
                        className="edit-input"
                      />
                    ) : (
                      // Render task text
                      <span>{todo.task}</span>
                    )}
                    <button
                      onClick={() => handleEdit(todo.id, todo.task)}
                      className="edit-btn"
                    >
                      <FaPencilAlt />
                    </button>
                    <button
                      onClick={() => handleDelete(todo.id)}
                      className="delete-btn"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="options">
              <span>
                {todos.filter((todo) => !todo.isCompleted).length} items left
              </span>
              <div className="filter-options">
                <button
                  onClick={() => handleFilter("all")}
                  className="text-button"
                >
                  <span className="all-btn">All</span>
                </button>
                <button
                  onClick={() => handleFilter("active")}
                  className="text-button"
                >
                  Active
                </button>
                <button
                  onClick={() => handleFilter("completed")}
                  className="text-button"
                >
                  Completed
                </button>
              </div>
              <button
                onClick={handleClearCompleted}
                className="text-button"
              >
                Clear Completed
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
