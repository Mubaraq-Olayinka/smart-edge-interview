import React from 'react'

const ViewTodo = ({data}: any) => {
    console.log(data, 'the data')
  return (
    <div className='bg-red-300 min-h-screen'>
        {data.map((todo: any) => (
            <>
            <h1>{todo.id}</h1>
            <p>{todo?.title}</p>
            
            </>
        ))}
    </div>
  )
}

export default ViewTodo