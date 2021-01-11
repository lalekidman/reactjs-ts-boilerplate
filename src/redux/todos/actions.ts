import * as actionTypes from './action-types'
import { ISignInAccountParams } from './interfaces'
export const signInAccount = (params: ISignInAccountParams) => ({type: actionTypes.ADD_TODO_SUCCEED, params: params})