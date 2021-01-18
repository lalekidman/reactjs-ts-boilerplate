import * as actionTypes from './action-types'
import { DEFAULT_REDUCER_STATUSES, } from '../../utils/constants'
import { IAddTodoReducer, IAddTodoReducerState } from './interfaces'
import {v4 as uuidV4} from 'uuid'
const initialState:IAddTodoReducerState = {
  data: [],
  status: DEFAULT_REDUCER_STATUSES.IDLE,
  error: null,
  retry: 0
}
export const addTodoReducer = (state = initialState, actions: IAddTodoReducer): IAddTodoReducerState => {
  const {type, payload, error} = actions
  console.log('actions :>> ', actions);
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
    case actionTypes.ADD_TODO:
      return {
        ...state,
        data: [...state.data, {...payload, createdAt: Date.now(), _id: uuidV4()}],
        error,
        status: DEFAULT_REDUCER_STATUSES.FETCHED
      }
    default:
      return state
  }
}
