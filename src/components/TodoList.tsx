import '../App.css'
import { useEffect, useState } from 'react'
import TodoCard from './TodoCard'
import TodoForm from './TodoForm'
import SortCard from './SortCard'

export interface ITodoItem {
  title: string,
  dueDate: Date,
  tagList: string[],
  completed: boolean,
}

export default function TodoList() {
  const [todos, setTodos] = useState<ITodoItem[]>([])
  const [refresh, setRefresh] = useState<boolean>(false)

  useEffect(() => {
    setRefresh(false)
  }, [refresh])

  const updateTodos = (todo: ITodoItem) => {
    setTodos([...todos, todo])
  }

  const sortByCompleted = () => {
    setTodos(todos.sort(function(a, b) {
      return Number(a.completed) - Number(b.completed)
    }))
    setRefresh(true)
  }

  const sortByDate = () => {
    setTodos(todos.sort(function(a, b) {
      return a.dueDate.getTime() - b.dueDate.getTime()
    }))
    setRefresh(true)
  }

  const toggleTodo = (todo: ITodoItem) => {
    todo.completed = !todo.completed
  }

  return (
    <div>
      <TodoForm updateTodos={updateTodos}/>
      <SortCard sortByCompleted={sortByCompleted} sortByDate={sortByDate} />
      <div>
        {todos.map((todo, index) => {
          return <TodoCard key={index} todo={todo} toggleTodo={toggleTodo}/>
        })}
      </div>
    </div>
  )
}
