import {put, all, call, takeLatest} from 'redux-saga/effects'
import {FETCH_ORDER_LIST_FAILED, FETCH_ORDER_LIST_PENDING, FETCH_ORDER_LIST_SUCCEED} from './action-types'
import {fetchOrdersList} from './api'
function * fetchOrderListWorker (data: any) {
  try {
    const res = yield call(<any>fetchOrdersList, data)
    console.log(' >>> res> ', res)
    yield put ({
      type: FETCH_ORDER_LIST_SUCCEED,
      data: res
    })
  } catch (err) {
    yield put({
      type: FETCH_ORDER_LIST_FAILED,
      error: err.message
    })
  }
}
export default function * () {
  yield all([
      takeLatest(<any>FETCH_ORDER_LIST_PENDING, fetchOrderListWorker),
    ])
  }
  