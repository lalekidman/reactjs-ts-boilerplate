import { IGeneralReducer, IGeneralReducerState } from "../../utils/interfaces";
import * as ActionTypes from './action-types'
export interface IFetchOrderListActions {
  type: string
}
export interface ITodoData {
  content: string
}
export type ITodoEntity = ITodoData & {
  _id: string
  updatedAt: number
  createdAt: number
}
export type IAddTodoReducerState = IGeneralReducerState<ITodoEntity>
export type IAddTodoReducer = IGeneralReducer<typeof ActionTypes>