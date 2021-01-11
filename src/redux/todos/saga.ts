import {put, all, call, takeLatest} from 'redux-saga/effects'
import * as actionTypes from './action-types'
import {addTodo} from './api'
function * addTodoWorker (data: any) {
  try {
    const res = yield call(addTodo as any, data)
    yield put ({
      type: actionTypes.ADD_TODO_SUCCEED,
      data: res
    })
  } catch (err) {
    yield put({
      type: actionTypes.ADD_TODO_FAILED,
      error: err.message
    })
  }
}
export default function * () {
  yield all([
      takeLatest(actionTypes.ADD_TODO_PENDING, addTodoWorker),
    ])
  }
  