import React from "react";
import TodoItem from "../components/TodoItem";
import { Todo } from "../models/todo.model";

interface TodoListProps {
  todos: Todo[];
  deleteTodo: (id: string) => void;
  toggleComplete: (id: string) => void;
  editTodo: (id: string, newTitle: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, deleteTodo, toggleComplete, editTodo }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} deleteTodo={deleteTodo} toggleComplete={toggleComplete} editTodo={editTodo} />
      ))}
    </ul>
  );
};

export default TodoList;
