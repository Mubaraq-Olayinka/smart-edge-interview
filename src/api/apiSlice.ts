import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//create,update,delete
interface Todos {
  id: string;
}

interface Notes {
  id: any;
  note: string;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
  endpoints: (builder) => ({
    getTodos: builder.query<Todos[], void>({
      query: () => "/todos",
    }),
  }),
  // define endpoints later
});

export const notesSlice = createSlice({
  name: "notes",
  initialState: [] as Notes[],
  reducers: {
    addNote: (state, action) => {
      state.push({ id: Date.now(), note: action.payload });
    },
    deleteNote: (state, action) => {
      return state.filter((note) => note.id !== action.payload);
    },
    updateNote: (state, action) => {
      const { id, note } = action.payload;
      const existingNote = state.find((n) => n.id === id);
      if (existingNote) {
        existingNote.note = note;
      }
    },
  },
});

export const { useGetTodosQuery } = apiSlice;
export const { addNote, deleteNote, updateNote } = notesSlice.actions;
export const notesReducer = notesSlice.reducer;
