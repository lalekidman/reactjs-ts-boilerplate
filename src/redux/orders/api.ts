import Http from 'axios'
import { HOST } from '../../utils/constants'
export const fetchOrdersList = () => {
	return Http({
		method: 'GET',
		url: `${HOST}/orders`,
	}).then(resp => {
		return resp.data
	})
}