import React from 'react'
import { useSelector} from 'react-redux'
export default () => {
  const TodoList = useSelector((state: any) => state.addedTodo.data)
  return (
    <div>
      <br />
      <ul>
        {TodoList.map((todo: any, index: number) => {
          return <li key={index}>{todo.content}</li>
        })}
      </ul>
    </div>
  )
}