import * as actionTypes from './action-types'
import { DEFAULT_REDUCER_STATUSES } from '../../utils/constants'
import { IFetchOrderState, IFetchOrderAction } from './interfaces'
const initialOrderState = <IFetchOrderState> {
  data: {data: [], totalCounts: 0, totalPages: 0},
  status: DEFAULT_REDUCER_STATUSES.IDLE,
  error: null,
  retry: 0
}
export const orderListReducer = (state = initialOrderState, actions: IFetchOrderAction): IFetchOrderState => {
  const {type, data, error} = actions
   console.log(' >> actions: ', actions)
  switch (type) {
    case actionTypes.FETCH_ORDER_LIST_PENDING:
      return {
        ...state,
        status: DEFAULT_REDUCER_STATUSES.FETCHING,
        retry: state.retry + 1
      }
    case actionTypes.FETCH_ORDER_LIST_SUCCEED:
      return {
        ...state,
        data,
        status: DEFAULT_REDUCER_STATUSES.FETCHED
      }
    case actionTypes.FETCH_ORDER_LIST_FAILED:
      return {
        ...state,
        error,
        status: DEFAULT_REDUCER_STATUSES.FAILED
      }
    default:
      return state
  }
}
