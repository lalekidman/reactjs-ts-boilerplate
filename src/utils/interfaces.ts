import {DEFAULT_REDUCER_STATUSES} from './constants'
export type IDEFAULT_REDUCER_STATUSES = keyof typeof DEFAULT_REDUCER_STATUSES
export interface IPaginationResponse {
    totalCounts: number
    totalPages: number
    data: any[]
}