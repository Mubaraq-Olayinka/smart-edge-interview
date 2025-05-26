// lib/store.ts
import { configureStore } from '@reduxjs/toolkit'
import apiReducer from '@/api/apiSlice'
import createApiReducer from '@/api/createApiSlice'

export const store = configureStore({
  reducer: {
    api: apiReducer,
    createTodo: createApiReducer
  }
})

// Type helpers
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
