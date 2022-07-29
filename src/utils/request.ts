import axios from 'axios'
import { ElMessage } from 'element-plus'
import { diffTokenTime } from './auth'
import { useUserStore } from '@/store/user'
import router from '@/router'

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
		const userStore = useUserStore()
		// 判断token是否存在以及是否失效
		if (localStorage.getItem('token')) {
			if (diffTokenTime()) {
				userStore.setToken('')
				localStorage.clear()
				sessionStorage.clear()
				router.replace('/login')
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
		console.log('error.response', error.response)
		if (error && error.response) {
			status(error.response.status)
		}
		return Promise.reject(new Error(error.response.data))
	}
)

// 错误码
const status = (statusCode) => {
	const userStore = useUserStore()
	let message = ''
	switch (statusCode) {
		case 400:
			message = '请求错误'
			break
		case 401: {
			message = '未授权，请登录'
			router.replace('/login')
			break
		}
		case 403:
			message = '没有权限，拒绝访问'
			break
		case 404:
			message = `请求地址出错`
			break
		case 408:
			message = '请求超时'
			break
		case 500:
			message = '服务器内部错误'
			break
		case 501:
			message = '服务未实现'
			break
		case 502:
			message = '网关错误'
			break
		case 503:
			message = '服务不可用'
			break
		case 504:
			message = '网关超时'
			break
		case 505:
			message = 'HTTP版本不受支持'
			break
		default:
			break
	}
	ElMessage.error(message)
}

export default service
