import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import { Todo, FILTERS, FilterType } from "./models/todo.model";

const initialTodos: Todo[] = [
  { id: uuidv4(), title: "Learn TypeScript", completed: false },
  { id: uuidv4(), title: "Build a React App", completed: false },
  { id: uuidv4(), title: "Deploy to Production", completed: true },
];

const TodoApp: React.FC = () => { 
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>(FILTERS.ALL);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    } else {
      setTodos(initialTodos);
      localStorage.setItem("todos", JSON.stringify(initialTodos));
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = (title: string) => {
    if (!title.trim()) return;
    const newTask: Todo = { id: uuidv4(), title, completed: false };
    setTodos([...todos, newTask]);
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id: string, newTitle: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle, completed: false } : todo
      )
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === FILTERS.ACTIVE) return !todo.completed;
    if (filter === FILTERS.COMPLETED) return todo.completed;
    return true; // если all вернем все задачки
  });

  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm addTodo={addTodo} />
      <h2>Total Tasks: {todos.length}</h2>
      <div>
        <button onClick={() => setFilter(FILTERS.ALL)}>Show All Tasks</button>
        <button onClick={() => setFilter(FILTERS.ACTIVE)}>Show Active Tasks</button>
        <button onClick={() => setFilter(FILTERS.COMPLETED)}>Show Completed Tasks</button>
      </div>
      <TodoList // вызов компонента
      todos={filteredTodos}
      deleteTodo={deleteTodo} 
      toggleComplete={toggleComplete}
      editTodo={editTodo} 
        />
    </div>
  );
};

export default TodoApp;

// localStorage.removeItem("todos");

