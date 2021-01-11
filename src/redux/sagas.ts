import {all} from 'redux-saga/effects'
import TodoSaga from './todos/saga'
import SignInSaga from './sign-in/saga'
// import all saga here
export default function * () {
  yield all([
    TodoSaga(),
    SignInSaga()
    // put it here
  ])
}