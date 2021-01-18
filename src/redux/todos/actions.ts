import * as actionTypes from './action-types'
import { ITodoData } from './interfaces'
export const addTodo = (data: ITodoData) => ({type: actionTypes.ADD_TODO, payload: data})