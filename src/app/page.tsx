"use client";
import {
  useCreateTodoMutation,
  useEditTodoMutation,
  useGetTodosQuery,
} from "@/api/apiSlice";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Todos {
  id: string;
  task: string;
}

export default function Home() {
  const { data, error, isLoading, refetch } = useGetTodosQuery();

  console.log(data);

  const [mutate] = useCreateTodoMutation();
  const [editMutate] = useEditTodoMutation();
  const [task, setTask] = useState("");

  useEffect(() => {
    if (data) {
      setTask(editTask?.task || "");
    }
  });

  const [editTask, setEditTask] = useState<Todos | null>(null);

  const handleEditTask = (item: Todos) => {
    setEditTask(item);
  };

  const handleAddTask = () => {
    if (editTask) {
      editMutate({ id: editTask.id, task });
    } else {
      mutate({ task });
      setTask("");
    }
    refetch();
    setTask("");
  };

  return (
    <div>
      <h3 className="text-center mt-7">Todo List</h3>
      <main className="w-[90%] mx-auto mt-5">
        {isLoading ? (
          <>loading...</>
        ) : (
          data?.map((item: Todos, index) => {
            return (
              <div key={index}>
                <p>{item?.id}</p>
                <div className="flex items-center gap-2">
                  <p>{item?.task}</p>
                  <button
                    className="bg-yellow-200 p-4 rounded-[10px]"
                    onClick={() => handleEditTask(item)}
                  >
                    Edit task
                  </button>
                  <button className="bg-red-200 p-4 rounded-[10px]">
                    Delete task
                  </button>
                </div>
              </div>
            );
          })
        )}

        <section className="my-20">
          <div className="flex flex-col gap-3">
            <label>Task</label>
            <input
              type="text"
              name="task"
              defaultValue={task}
              className="border border-gray-300 px-3 py-2 rounded-[10px] focus:outline-none focus:border-blue-500"
              onChange={(e) => setTask(e.target.value)}
            />
          </div>

          <button
            onClick={handleAddTask}
            className="bg-green-200 px-4 rounded-[10px] my-5"
          >
            Add Task
          </button>
        </section>
      </main>
    </div>
  );
}
