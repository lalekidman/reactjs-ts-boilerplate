import { IGeneralReducer, IGeneralReducerState } from "../../utils/interfaces";
import * as actionTypes from './action-types'
export interface IFetchOrderListActions {
  type: string
}
export type IValidateAuthenticationState = IGeneralReducerState<IAccountData>
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
export type IValidateAuthenticationReducer = IGeneralReducer<typeof actionTypes>