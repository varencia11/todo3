import React, { useState } from "react";
import { Todo } from "../models/todo.model";

interface TodoItemProps {
  todo: Todo;
  deleteTodo: (id: string) => void;
  toggleComplete: (id: string) => void;
  editTodo: (id: string, newTitle: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, deleteTodo, toggleComplete, editTodo }) => { // функц  компонет с пропсами
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  return (
    <li>
      {isEditing && (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <button
            onClick={() => {
              if (editedTitle.trim()) {
                editTodo(todo.id, editedTitle);
                setIsEditing(false);
              }
            }}
          >
            Save
          </button>
          <button
            onClick={() => {
              setEditedTitle(todo.title);
              setIsEditing(false);
            }}
          >
            Cancel
          </button>
        </>
      )}
  
      {!isEditing && (
        <>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleComplete(todo.id)}
          />
          <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
            {todo.title}
          </span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </>
      )}
    </li>
  );
  
};

export default TodoItem;
