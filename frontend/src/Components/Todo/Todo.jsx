import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTrash,
  faEdit,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import EditTodo from "../EditTodo/EditTodo";
import "./Todo.css";

const Todo = () => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState("");
  const taskInputRef = useRef(null);

  const addTodo = () => {
    if (!todo) return;
    setTodoList([...todoList, { task: todo, completed: false }]);
    taskInputRef.current.value = "";
    setTodo("");
  };

  const deleteTodo = (taskToDelete) => {
    setTodoList(todoList.filter((task) => task.task !== taskToDelete));
  };

  const toggleCompleteTask = (taskToToggle) => {
    setTodoList(
      todoList.map((task) =>
        task.task === taskToToggle
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const openEditModal = (taskToEdit) => {
    setCurrentTask(taskToEdit);
    setIsModalOpen(true);
  };

  const editTodo = (newTask) => {
    setTodoList(
      todoList.map((task) =>
        task.task === currentTask ? { ...task, task: newTask } : task
      )
    );
    setCurrentTask(""); // Reset currentTask
  };

  return (
    <div className="todo">
      <div className="todo-container">
        <div className="add-todo">
          <input
            name="todo"
            type="text"
            placeholder="Enter todo task..."
            value={todo}
            ref={taskInputRef}
            onChange={(event) => setTodo(event.target.value)}
            required
          />
          <button className="add-button" onClick={addTodo}>
            Add
          </button>
        </div>
        <div className="separator"></div>
        <ul className="todoalign">
          {todoList.map((task) => (
            <div key={task.task} className="todo-task">
              <li className={`task ${task.completed ? "completed" : ""}`}>
                {task.completed ? (
                  <FontAwesomeIcon icon={faCheck} color="green" />
                ) : (
                  <FontAwesomeIcon icon={faCircle} color="#a0a0a0" />
                )}
                <div className="task-container"> 
                  <span className="task-text">{task.task}</span>
                </div>
              </li>
              <div className="buttons">
                <button onClick={() => toggleCompleteTask(task.task)}>
                  <FontAwesomeIcon
                    icon={faCheck}
                    color={task.completed ? "green" : "#a0a0a0"}
                  />
                </button>
                <button onClick={() => openEditModal(task.task)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button onClick={() => deleteTodo(task.task)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </ul>
      </div>
      <EditTodo
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={currentTask}
        onEdit={editTodo}
      />
    </div>
  );
};

export default Todo;
