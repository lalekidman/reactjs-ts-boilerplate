import * as actionTypes from './action-types'
import { DEFAULT_REDUCER_STATUSES, } from '../../utils/constants'
import { IAddTodoReducer, IAddTodoState } from './interfaces'
const initialState:IAddTodoState = {
  data: {
    _id: '',
    content: '',
    createdAt: 0,
    updatedAt: 0,
  },
  status: DEFAULT_REDUCER_STATUSES.IDLE,
  error: null,
  retry: 0
}
export const addTodoReducer = (state = initialState, actions: IAddTodoReducer): IAddTodoState => {
  const {type, payload, error} = actions
  switch (type) {
    case actionTypes.ADD_TODO_PENDING:
      return {
        ...state,
        status: DEFAULT_REDUCER_STATUSES.FETCHING,
        retry: state.retry + 1
      }
    case actionTypes.ADD_TODO_SUCCEED:
      return {
        ...state,
        data: payload,
        status: DEFAULT_REDUCER_STATUSES.FETCHED
      }
    case actionTypes.ADD_TODO_FAILED:
      return {
        ...state,
        error,
        status: DEFAULT_REDUCER_STATUSES.FAILED
      }
    default:
      return state
  }
}
