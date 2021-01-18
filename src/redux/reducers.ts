import {combineReducers} from 'redux'
import {addTodoReducer} from './todos/reducer'
import {signInAccountReducer} from './sign-in/reducer'
import {validateAuthenticationReducer} from './validate-authentication/reducer'
// import { IFetchOrderState } from './sign-in/interfaces'
// import reducers here
export default combineReducers({
    addedTodo: addTodoReducer,
    authentication: signInAccountReducer,
    auth: validateAuthenticationReducer,
//   toast
// implement here
})