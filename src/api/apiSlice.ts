import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Todos {
  id: string;
  value: string;
  completed: boolean;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
  tagTypes: ["todos"],
  endpoints: (builder) => ({
    getTodos: builder.query<Todos[], void>({
      query: () => "/todos",
      providesTags: ["todos"],
    }),

    addTodos: builder.mutation<Todos, Partial<Todos>>({
      query: ({ id, value }) => ({
        url: `/todos`,
        method: "POST",
        body: { id, value },
      }),
      invalidatesTags: ["todos"],
    }),

    deleteTodo: builder.mutation<{ id: string }, string>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["todos"],
    }),
    updateTodo: builder.mutation<Todos, Partial<Todos>>({
      query: ({ id, ...body }) => ({
        url: `/todos/${id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["todos"],
    }),
  }),

  // define endpoints later
});

export const {
  useGetTodosQuery,
  useAddTodosMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} = apiSlice;
