import * as actionTypes from './action-types'
import { ISignInAccountParams } from './interfaces'
export const signInAccount = (params: ISignInAccountParams) => ({type: actionTypes.ACCOUNT_SIGN_IN_PENDING, data: params})