import { useEffect, useState } from "react";
import "./App.css";
import { TodoProvider } from "./contexts";
import { TodoForm } from "./components";
import TodoItem from "./components/TodoItems";

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => {
    return [{id: Date.now(), ...todo}, ...prev]
    })
    
  } 

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo)=> (prevTodo.id === id ? todo : prevTodo)))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo)=> prevTodo.id !== id))
    // filter used for delete.
  }

  const toggleComplete = (id) => {
    setTodos((prev)=> prev.map((prevTodo)=> prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed}  : prevTodo))

  }

  // when the application loads for the first time all the todos are rendered and stored in the localStorage.
  useEffect(()=>{
    const todos = JSON.parse(localStorage.getItem("todos"))

    if(todos && todos.length > 0){
      setTodos(todos)
    } 
  }, [])

// these both useEffect doing its work by their own.

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])
  



  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
    <div className="bg-[#172842] min-h-screen w-screen">
      <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
        <h1 className="text-2xl font-bold text-center mb-8 mt-2">
          Manage Your Todos
        </h1>
        <div className="mb-4">
        {/* Todo form goes here */}
        <TodoForm/>
        </div>
        <div className="flex flex-wrap gap-y-3">
          {todos.map((todo)=> (
            <div className="w-full" key={todo.id}>
            {/* if index then array will restructure key have to restructure 
            if unique ids then only one element is deleted*/}
              <TodoItem todo={todo}/>
            </div>
          ))}
        </div>
      </div>
    </div>
    </TodoProvider>
  );
}

export default App;
