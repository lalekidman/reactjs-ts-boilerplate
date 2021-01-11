import {combineReducers} from 'redux'
import {addTodoReducer} from './todos/reducer'
// import { IFetchOrderState } from './sign-in/interfaces'
// import reducers here
export default combineReducers({
    addedTodo: addTodoReducer
//   toast
// implement here
})