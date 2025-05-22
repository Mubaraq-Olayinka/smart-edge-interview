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
      invalidatesTags: [{type: "Todos"}],
    }),
  }),
})

export const {useGetTodosQuery, useCreateTodosMutation} = apiSlice
