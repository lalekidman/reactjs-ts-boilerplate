import * as actionTypes from './action-types'
import { DEFAULT_REDUCER_STATUSES } from '../../utils/constants'
import { IValidateAuthenticationState, IValidateAuthenticationReducer } from './interfaces'
const initialState:IValidateAuthenticationState = {
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
export const validateAuthenticationReducer = (state = initialState, actions: IValidateAuthenticationReducer): IValidateAuthenticationState => {
  const {type, payload, error} = actions
  switch (type) {
    case actionTypes.VALIDATE_AUTHENTICATION_PENDING:
      return {
        ...state,
        status: DEFAULT_REDUCER_STATUSES.FETCHING,
        retry: state.retry + 1
      }
    case actionTypes.VALIDATE_AUTHENTICATION_SUCCEED:
      return {
        ...state,
        data: payload,
        status: DEFAULT_REDUCER_STATUSES.FETCHED
      }
    case actionTypes.VALIDATE_AUTHENTICATION_FAILED:
      return {
        ...state,
        error,
        status: DEFAULT_REDUCER_STATUSES.FAILED
      }
    default:
      return state
  }
}
