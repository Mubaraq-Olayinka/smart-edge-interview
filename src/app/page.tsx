"use client";
import {
  useAddTodosMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "@/api/apiSlice";
import React, { useState } from "react";

export default function Home() {
  const { data, error, isLoading, refetch } = useGetTodosQuery();
  const [newListItem, setNewListItem] = useState("");
  const [addPost, { isLoading: loadingPost }] = useAddTodosMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  return (
    <div className="w-full h-screen text-black justify-center items-center bg-gray-100 flex flex-col space-y-5">
      <div className="flex gap-5 items-center">
        <input
          value={newListItem}
          onChange={(e: any) => setNewListItem(e.target.value)}
          type="text"
          className="test-sm border border-gray-300 rounded-lg px-4 py-2.5"
          placeholder="Enter a todo list"
        />
        <button
          disabled={newListItem?.trim?.() === ""}
          onClick={async () => {
            const trimmedValue = newListItem?.trim?.();
            await addPost({
              id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
              value: trimmedValue,
              completed: false,
            });
            setNewListItem("");
          }}
          className="px-4 py-2.5 disabled:bg-gray-300 disabled:text-gray-700 rounded-lg border hover:opacity-70  bg-blue-600 text-white cursor-pointer text-center text-sm"
        >
          {loadingPost ? "Loading..." : "+ Add"}
        </button>
      </div>
      {isLoading ? (
        <div className="grid grid-cols-2 gap-5 ">
          <div className="h-10 w-full bg-gray-400 animate-pulse"></div>
          <div className="h-10 w-full bg-gray-400 animate-pulse"></div>
        </div>
      ) : error ? (
        <div className="space-y-5 flex flex-col justify-center items-center border border-gray-300 p-5 rounded-lg">
          <div className="w-10 h-10 font-bold rounded-full flex justify-center items-center border border-yellow-600 text-yellow-600">
            !
          </div>
          <p className="text-xs">Failed to fetch data! Try again</p>
          <button
            onClick={() => {
              refetch?.();
            }}
            className="px-4 rounded-lg py-2 bg-blue-600 text-white hover:opacity-70 text-xs"
          >
            Retry
          </button>
        </div>
      ) : //@ts-ignore
      data?.length > 0 ? (
        <div className="relative w-full sm:w-1/2 mx-auto overflow-x-auto rounded border border-gray-400 shadow-md sm:border-gray-300">
          <table className="relative w-full text-left text-sm text-gray-500 rtl:text-right ">
            <thead className="bg-gray-300 text-xs font-medium text-gray-700 ">
              <tr>
                <th
                  scope="col"
                  className="whitespace-nowrap px-5 py-2.5 text-xs"
                >
                  S/N
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-5 py-2.5 text-xs"
                >
                  Todo
                </th>

                <th
                  scope="col"
                  className="whitespace-nowrap px-5 py-2.5 text-xs"
                ></th>
              </tr>
            </thead>
            <tbody>
              {data?.map?.((item, index) => (
                <tr key={item?.id} className={` border-b hover:bg-gray-50`}>
                  <th
                    scope="row"
                    className="whitespace-nowrap px-5 py-2.5 text-sm font-normal"
                  >
                    {index + 1}
                  </th>
                  <td
                    className={`whitespace-nowrap px-5 ${
                      item?.completed ? "line-through" : ""
                    } py-2.5 text-sm`}
                  >
                    {item?.value}
                  </td>

                  <td className="whitespace-nowrap flex gap-2 items-center justify-end px-5 py-2.5">
                    <button
                      onClick={async () => {
                        await updateTodo({
                          id: item.id,
                          completed: !item.completed,
                          value: item?.value,
                        });
                      }}
                      className={`flex items-center p-1 gap-1 rounded border text-xs ${
                        item?.completed
                          ? "border-gray-600 text-gray-600 hover:bg-gray-600"
                          : "border-green-600 text-green-600 hover:bg-green-600"
                      } hover:text-white hover:opacity-70`}
                    >
                      {item?.completed ? "Revert" : "Complete"}
                    </button>
                    <button
                      onClick={async () => {
                        await deleteTodo(item?.id);
                      }}
                      className="flex items-center gap-1 rounded border text-xs border-red-600 p-1 text-red-600 hover:bg-red-600 hover:text-white hover:opacity-70"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <p className="text-sm">No data avialable!</p>
        </div>
      )}
    </div>
  );
}
