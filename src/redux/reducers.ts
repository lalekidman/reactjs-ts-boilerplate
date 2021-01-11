import {combineReducers} from 'redux'
import {signInAccountReducer} from './todos/reducer'
// import { IFetchOrderState } from './sign-in/interfaces'
// import reducers here
export default combineReducers({
    authorizedAccount: signInAccountReducer
//   toast
// implement here
})