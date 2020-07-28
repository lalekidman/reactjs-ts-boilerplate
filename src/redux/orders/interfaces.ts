import { IDEFAULT_REDUCER_STATUSES, IPaginationResponse } from "../../utils/interfaces";
import {FETCH_ORDER_LIST_PENDING, FETCH_ORDER_LIST_FAILED, FETCH_ORDER_LIST_SUCCEED} from './action-types'
export interface IFetchOrderListActions {
    type: string
}
export type IFetchOrderState  = {
    data: Omit<IPaginationResponse, 'data'> & {data: IFetchOrderData[]}
    status: IDEFAULT_REDUCER_STATUSES | string
    error: string|null
    retry: number
  }
export type IFetchOrderData = {
    _id: string
    productId: string
    customerId: string
    quantity: string
    updatedAt: string
    createdAt: string
  }
export type IFetchOrderAction = {
    data?: any
    error?: any,
    type: typeof FETCH_ORDER_LIST_PENDING | typeof FETCH_ORDER_LIST_FAILED | typeof FETCH_ORDER_LIST_SUCCEED
  }