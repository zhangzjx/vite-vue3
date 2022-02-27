import request from '@/utils/request'

export const login = (data: object) => {
	return request({
		url: '/login',
		method: 'POST',
		data
	})
}
