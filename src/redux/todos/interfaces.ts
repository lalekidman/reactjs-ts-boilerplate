import { IDEFAULT_REDUCER_STATUSES, IGeneralReducer } from "../../utils/interfaces";
import * as ActionTypes from './action-types'
export interface IFetchOrderListActions {
  type: string
}
export type IAddTodoState  = {
  data: ITodoEntity
  status: IDEFAULT_REDUCER_STATUSES
  error: string|null
  retry: number
}
export interface ITodoData {
  content: string
}
export type ITodoEntity = ITodoData & {
  _id: string
  updatedAt: number
  createdAt: number
}
export type IAddTodoReducer = IGeneralReducer<typeof ActionTypes>