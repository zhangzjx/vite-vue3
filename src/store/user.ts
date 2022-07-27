import { defineStore } from 'pinia'
import { login as loginApi } from '@/api/login'
import router from '@/router'
import { setTokenTime } from '@/utils/auth'
import { ElMessageBox } from 'element-plus'
import { defautData } from '@/mock/main'

export const useUserStore = defineStore('user', {
	state: () => {
		return {
			token: localStorage.getItem('token') || '',
			routes: [] // 路由
		}
	},
	getters: {
		getToken: (state) => {
			return state.token
		}
	},
	actions: {
		setToken(token: string) {
			this.token = token
			localStorage.setItem('token', token)
		},
		generateRoutes() {},
		login(userInfo) {
			const { username, password } = userInfo
			return new Promise<void>((resolve, reject) => {
				loginApi({
					username: username.trim(),
					password: password
				})
					.then((res) => {
						location.reload()
						console.log('登录成功', res)
						this.setToken(res?.token)
						setTokenTime()
						router.replace('/')
						localStorage.setItem('defautData', JSON.stringify(defautData))
						resolve()
					})
					.catch((err) => {
						reject(err)
					})
			})
		},
		// 退出
		logout() {
			ElMessageBox.confirm('确认退出当前账户吗？', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'info'
			}).then(() => {
				console.log('确认退出当前账户吗？')
				this.setToken('')
				localStorage.clear()
				sessionStorage.clear()

				console.log('退出')
				router.replace('/login')
			})
		}
	}
})
