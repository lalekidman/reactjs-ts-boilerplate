import {put, all, call, takeLatest} from 'redux-saga/effects'
import * as actionTypes from './action-types'
import {signInAccount} from './api'
function * validateAuthenticationWorker (data: any) {
  try {
    const res = yield call(signInAccount as any, data)
    yield put ({
      type: actionTypes.VALIDATE_AUTHENTICATION_SUCCEED,
      data: res
    })
  } catch (err) {
    yield put({
      type: actionTypes.VALIDATE_AUTHENTICATION_FAILED,
      error: err.message
    })
  }
}
export default function * () {
  yield all([
      takeLatest(actionTypes.VALIDATE_AUTHENTICATION_PENDING, validateAuthenticationWorker),
    ])
  }
  