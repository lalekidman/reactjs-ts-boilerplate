import {combineReducers} from 'redux'
import {orderListReducer} from './orders/reducer'
import { IFetchOrderState } from './orders/interfaces'
// import reducers here
export default combineReducers({
    orderList: orderListReducer
//   toast
// implement here
})