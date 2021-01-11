import { IDEFAULT_REDUCER_STATUSES, IGeneralReducer } from "../../utils/interfaces";
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
export interface ISignInAccountParams {
  username: string
  password: string
}
export type IAccountData = {
  _id: string
  firstName: string
  lastName: string
  middleName?: string
  updatedAt: number
  createdAt: number
}
export type ISignInAccountReducer = IGeneralReducer<typeof actionTypes>