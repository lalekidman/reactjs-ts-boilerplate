import Http from 'axios'
import { HOST } from '../../utils/constants'
import {  ITodoEntity} from './interfaces'
export const addTodo = ({data}: any) => {
	return Http({
		method: 'POST',
		url: `${HOST}/todos`,
	}).then(resp => {
		return resp.data as ITodoEntity
	})
}