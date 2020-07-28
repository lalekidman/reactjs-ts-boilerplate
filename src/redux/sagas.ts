import {all} from 'redux-saga/effects'
import OrderSaga from './orders/saga'
// import all saga here
export default function * () {
  yield all([
    OrderSaga()
    // put it here
  ])
}