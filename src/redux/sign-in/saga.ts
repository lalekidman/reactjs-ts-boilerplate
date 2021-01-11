import {put, all, call, takeLatest} from 'redux-saga/effects'
import * as actionTypes from './action-types'
import {signInAccount} from './api'
function * signInAccountWorker (data: any) {
  try {
    const res = yield call(signInAccount as any, data)
    yield put ({
      type: actionTypes.ACCOUNT_SIGN_IN_SUCCEED,
      data: res
    })
  } catch (err) {
    yield put({
      type: actionTypes.ACCOUNT_SIGN_IN_FAILED,
      error: err.message
    })
  }
}
export default function * () {
  yield all([
      takeLatest(actionTypes.ACCOUNT_SIGN_IN_PENDING, signInAccountWorker),
    ])
  }
  