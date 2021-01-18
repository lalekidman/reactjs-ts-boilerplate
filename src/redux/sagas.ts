import {all} from 'redux-saga/effects'
import TodoSaga from './todos/saga'
import SignInSaga from './sign-in/saga'
import ValidateAuthenticationSaga from './validate-authentication/saga'
// import all saga here
export default function * () {
  yield all([
    TodoSaga(),
    SignInSaga(),
    ValidateAuthenticationSaga(),
    // put it here
  ])
}