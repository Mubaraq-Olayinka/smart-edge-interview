import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Todos {
  id: string;
  task: string;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
  endpoints: (builder) => ({
    getTodos: builder.query<Todos[], void>({
      query: () => "/todos",
    }),
    createTodo: builder.mutation<Todos, Partial<Todos>>({
      query: (data) => ({
        url: `todos`,
        method: "POST",
        body: data,
      }),
    }),
    editTodo: builder.mutation<Todos, Partial<Todos>>({
      query: ({ id, ...data }) => ({
        url: `todos/${id}`,
        method: "put",
        body: data,
      }),
    }),
    deleteTodo: builder.mutation<Todos, Partial<Todos>>({
      query: ({ id }) => ({
        url: `todos/${id}`,
        method: "delete",
      }),
    }),
  }), // define endpoints later
});

export const { useGetTodosQuery, useCreateTodoMutation, useEditTodoMutation, useDeleteTodoMutation } =
  apiSlice;
