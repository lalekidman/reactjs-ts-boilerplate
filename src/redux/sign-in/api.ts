import Http from 'axios'
import { HOST } from '../../utils/constants'
import { IAccountData } from './interfaces'
export const signInAccount = () => {
	return Http({
		method: 'POST',
		url: `${HOST}/authentication/sign-in`,
	}).then(resp => {
		return resp.data as IAccountData
	})
}