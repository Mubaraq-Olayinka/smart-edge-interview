'use client'
import { useGetTodosQuery } from "@/api/apiSlice";
import AddNote from "@/component/AddNote";
import Notes from "@/component/NoteList";
import Image from "next/image";

export default function Home() {
  const { data, error, isLoading } = useGetTodosQuery();

  console.log(data);

  return (
    <div>
      {/* <AddNote /> */}
      <Notes />
    </div>
  );
}
