"use client"
import {useState} from "react"
import {PlusIcon, XMarkIcon, CheckIcon} from "@heroicons/react/24/outline"
import {Todos, useCreateTodosMutation, useGetTodosQuery, useUpdateTodosMutation, useDeleteTodosMutation} from "@/api/apiSlice"

export default function Home() {
  const {data, error, isLoading} = useGetTodosQuery()
  const [createTodo, {data: postData, isSuccess, isError, error: errorCreated}] = useCreateTodosMutation()

  console.log(data)

  const [newTodo, setNewTodo] = useState("")

  const addTodo = async () => {
    if (!newTodo.trim()) return

    const todo: Todos = {
      id: Date.now().toString(),
      title: newTodo,
      isCompleted: false,
    }

    await createTodo(todo)
    setNewTodo("")
  }

  const [updateTodo] = useUpdateTodosMutation()
  const [deleteTodoMutation] = useDeleteTodosMutation()

  const toggleTodo = async (id: string) => {
    try {
      const todo = data?.find((t: Todos) => t.id === id)
      if (todo) {
        await updateTodo({
          ...todo,
          isCompleted: !todo.isCompleted,
        })
      }
    } catch (error) {
      console.error("Error toggling todo:", error)
    }
  }

  const deleteTodo = async (id: string) => {
    try {
      await deleteTodoMutation(id)
    } catch (error) {
      console.error("Error deleting todo:", error)
    }
  }

  return (
    <div className='min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md mx-auto bg-white rounded-xl shadow-lg p-6'>
        <h1 className='text-3xl font-bold text-gray-800 mb-6'>Todo List</h1>

        <div className='flex space-x-4 mb-6'>
          <input
            type='text'
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder='Add a new todo...'
            className='flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <button
            onClick={addTodo}
            className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          >
            <PlusIcon className='h-5 w-5' />
          </button>
        </div>

        <ul className='space-y-3'>
          {data &&
            data.map((todo) => (
              <li key={todo.id} className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
                <div className='flex items-center space-x-3'>
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer ${todo.isCompleted ? "bg-green-500" : "bg-gray-200"}`}
                  >
                    {todo.isCompleted && <CheckIcon className='h-4 w-4 text-white' />}
                  </button>
                  <span className={`font-medium ${todo.isCompleted ? "line-through text-gray-400" : "text-gray-700"}`}>{todo.title}</span>
                </div>
                <button onClick={() => deleteTodo(todo.id)} className='text-red-500 hover:text-red-600'>
                  <XMarkIcon className='h-5 w-5' />
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}
