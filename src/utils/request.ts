import axios from 'axios'
import { ElMessage } from 'element-plus'
import { diffTokenTime } from './auth'
import store from '@/store'

const isProd = import.meta.env.VITE_ENV === 'production'

let baseURL
// 判断环境
if (isProd) {
	baseURL = import.meta.env.VITE_PUBLIC_PATH
} else {
	baseURL = '/prod'
}
console.log('baseURL', baseURL)
const service = axios.create({
	baseURL: baseURL,
	timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
	(config) => {
		// 判断token是否存在以及是否失效
		if (localStorage.getItem('token')) {
			if (diffTokenTime()) {
				store.dispatch('app/logout')
				return Promise.reject(new Error('token 失效了'))
			}
		}
		config.headers.Authorization = localStorage.getItem('token')
		return config
	},
	(error) => {
		return Promise.reject(new Error(error))
	}
)

// 响应拦截器
service.interceptors.response.use(
	(response) => {
		const { data, meta } = response.data
		if (meta.status === 200 || meta.status === 201) {
			return data
		} else {
			ElMessage.error(meta.msg)
			return Promise.reject(new Error(meta.msg))
		}
	},
	(error) => {
		console.log(error.response)
		error.response && ElMessage.error(error.response.data)
		return Promise.reject(new Error(error.response.data))
	}
)

export default service
