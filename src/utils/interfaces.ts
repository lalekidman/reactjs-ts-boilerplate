import {DEFAULT_REDUCER_STATUSES} from './constants'
export type IDEFAULT_REDUCER_STATUSES = keyof typeof DEFAULT_REDUCER_STATUSES
export interface IPaginationResponse {
    totalCounts: number
    totalPages: number
    data: any[]
}
export type IGeneralReducer<T> = {
    payload: any
    error?: any,
    type: keyof T
  }
export type IGeneralReducerState<T> = {
    data: T
    status: IDEFAULT_REDUCER_STATUSES
    error: string|null
    retry: number
  }