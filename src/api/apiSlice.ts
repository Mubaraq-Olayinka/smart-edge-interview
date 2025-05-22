import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export interface Todos {
  id: string
  title: string
  isCompleted: boolean
}

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Todos"],
  baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3500"}),
  endpoints: (builder) => ({
    getTodos: builder.query<Todos[], void>({
      providesTags: ["Todos"],
      query: () => "/todos",
    }),
    createTodos: builder.mutation<Todos, Todos>({
      query: (body: Todos) => ({
        url: "/todos",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Todos"],
    }),
    updateTodos: builder.mutation<Todos, Todos>({
      query: (body: Todos) => ({
        url: `/todos/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Todos"],
    }),
    deleteTodos: builder.mutation<Todos, string>({
      query: (id: string) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
})

export const {useGetTodosQuery, useCreateTodosMutation, useUpdateTodosMutation, useDeleteTodosMutation} = apiSlice
