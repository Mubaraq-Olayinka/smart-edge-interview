import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Todos {
  id: string;
  task: string;
}

export const createTask = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    createTodo: builder.mutation<Todos, Partial<Todos>>({
      query: (data) => ({
        url: `todos`,
        method: "POST",
        body: data,
      }),
    }),
  }), // define endpoints later
});

export const { useCreateTodoMutation } = createTask;
