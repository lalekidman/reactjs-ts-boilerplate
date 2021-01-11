import {all} from 'redux-saga/effects'
import OrderSaga from './todos/saga'
// import all saga here
export default function * () {
  yield all([
    OrderSaga()
    // put it here
  ])
}