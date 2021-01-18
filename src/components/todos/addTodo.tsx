import React, { ChangeEvent, useState } from 'react'
import {bindActionCreators} from 'redux'
import {addTodo} from '../../redux/todos/actions'
import { useSelector, useDispatch} from 'react-redux'
import { AppState } from '../../store-redux'
import {
  Button,
  Alert, Form
} from 'react-bootstrap'
// import {
//   Button,
//   TextField
// } from '@material-ui/core'
import { ITodoData } from '../../redux/todos/interfaces'
import { DEFAULT_REDUCER_STATUSES } from '../../utils/constants'
interface IComponentState {
  newTodo: string
}
interface  IMapStateToProps extends Pick<AppState, 'addedTodo'> {
}
interface IMapDispatchToProps {
  addTodo: (data: ITodoData) => void
}
// type IProps = IMapDispatchToProps
type IProps = IMapDispatchToProps & IMapStateToProps
export default () => {
  const [todoFormData, setTodoFormData] = useState(() => ({content: ''})) 
  const AddTodosDispatcher = useDispatch()
  
  const handleAddTodoButton = () => {
    console.log('formData :>> ', todoFormData);
    // setTodoFormData((prevValue) => ({...prevValue, ...formData}))
    AddTodosDispatcher(addTodo({
      content: todoFormData.content
    }))
  }
  const handleTodoFormData = (formData: Partial<ITodoData>) => {
    setTodoFormData((prevValue) => ({...prevValue, ...formData}))
  }
  return (
    <div>
      <br />

      {/* <TextField type='text' value={newTodo} placeholder = "Enter Todo's" onChange={this.newTodos}/> */}
      <Form.Control
        placeholder='New Todo'
        value={todoFormData.content}
        onChange={(e) => handleTodoFormData({content: e.target.value})}
        />
      <Button 
        variant="primary"
        onClick={handleAddTodoButton}
        >
          Add Todo
        </Button>
    </div>
  )
}