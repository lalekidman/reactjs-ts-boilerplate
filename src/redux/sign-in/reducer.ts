import * as actionTypes from './action-types'
import { DEFAULT_REDUCER_STATUSES } from '../../utils/constants'
import { ISignInAccountState, ISignInAccountReducer } from './interfaces'
const initialState:ISignInAccountState = {
  data: {
    _id: '',
    firstName: '',
    lastName: '',
    middleName: '',
    createdAt: 0,
    updatedAt: 0,
  },
  status: DEFAULT_REDUCER_STATUSES.IDLE,
  error: null,
  retry: 0
}
export const signInAccountReducer = (state = initialState, actions: ISignInAccountReducer): ISignInAccountState => {
  const {type, data, error} = actions
  switch (type) {
    case actionTypes.ACCOUNT_SIGN_IN_PENDING:
      return {
        ...state,
        status: DEFAULT_REDUCER_STATUSES.FETCHING,
        retry: state.retry + 1
      }
    case actionTypes.ACCOUNT_SIGN_IN_SUCCEED:
      return {
        ...state,
        data,
        status: DEFAULT_REDUCER_STATUSES.FETCHED
      }
    case actionTypes.ACCOUNT_SIGN_IN_FAILED:
      return {
        ...state,
        error,
        status: DEFAULT_REDUCER_STATUSES.FAILED
      }
    default:
      return state
  }
}
