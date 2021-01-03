import { IDEFAULT_REDUCER_STATUSES } from "../../utils/interfaces";
import * as actionTypes from './action-types'
export interface IFetchOrderListActions {
  type: string
}
export type ISignInAccountState  = {
  data: IAccountData
  status: IDEFAULT_REDUCER_STATUSES
  error: string|null
  retry: number
}
export type IAccountData = {
  _id: string
  firstName: string
  lastName: string
  middleName?: string
  updatedAt: number
  createdAt: number
}
export type ISignInAccountReducer = {
  data?: any
  error?: any,
  type: keyof typeof actionTypes
}