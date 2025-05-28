import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { todo } from 'node:test';
// http://localhost:3500

interface newTodo{
    todo: string;
}
interface TodosState {
    todo: string
    status: "idle" | "loading" | "success" | "failed";
    error: string | null;
}

const initial = {
  todo: [],
  status: "idle",
  error: null,
}

const newTodo = {
    todo: ''
}

export const fetchTodos = createAsyncThunk ("todo/users", async () => {

  const res = await fetch('http://localhost:3500/todos', {
    method: "POST",
    body: JSON.stringify(newTodo),
  })

  if(!res.ok) {
    throw new Error('failed to create new todos')
  }

  const response = res.json();

  return response;
})

export const createApiSlice = createSlice({
  name: 'createTodo',
  initialState: initial,
  reducers: {}, // sync func
  extraReducers: (builder) => {
    builder
    .addCase(fetchTodos.pending, (state, action) => {
      // state.data = action.
      state.error = null
    })
    .addCase(fetchTodos.fulfilled, (state, action) => {
      state.todo = action.payload
    })
  }
})

export default createApiSlice.reducer
