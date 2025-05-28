'use client'

import CreateTodo from "@/_components/CreateTodo";
import ViewTodo from "@/_components/ViewTodo";
import { fetchTodos } from "@/api/apiSlice";
import { AppDispatch } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function Home() {
  const { data: api, } = useSelector((state) => state.api);
  const { data: createTodo, } = useSelector((state) => state.createTodo);
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {

    const fetchData = async () => {
      await dispatch(fetchTodos())

    }
    console.log(api, 'me')

    fetchData()
  }, [])

  console.log(api)

  return (
    <div className="">
      <ViewTodo data={api}/>
      <CreateTodo />
    </div>
  );
}
