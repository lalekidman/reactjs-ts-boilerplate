import Http from 'axios'
import { HOST } from '../../utils/constants'
import { IAccountData } from './interfaces'
export const signInAccount = ({data}: any) => {
	return Http({
		method: 'POST',
		url: `${HOST}/authentication`,
		data,
	}).then(resp => {
		return resp.data as IAccountData
	})
}