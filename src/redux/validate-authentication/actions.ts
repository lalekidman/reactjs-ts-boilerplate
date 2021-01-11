import * as actionTypes from './action-types'
import { ISignInAccountParams } from './interfaces'
export const validateAuthentication = (params: ISignInAccountParams) => ({type: actionTypes.VALIDATE_AUTHENTICATION_PENDING, data: params})