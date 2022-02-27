import request from '@/utils/request'

export const menuList = () => {
	return request({
		url: '/meuns',
		method: 'GET'
	})
}
