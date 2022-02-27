//src/store/user.ts
import { defineStore } from 'pinia'
// import { useAppStore } from './app'
import { login as loginApi } from '@/api/login'
import router from '@/router'
import { setTokenTime } from '@/utils/auth'

export const useUserStore = defineStore({
	id: 'user',
	state: () => {
		return {
			token: localStorage.getItem('token') || '',
			siderType: true, // 左侧导航栏初始状态
			lang: localStorage.getItem('lang') || 'zh'
		}
	},
	getters: {
		token: (state) => {
			return state.token
		},
		siderType: (state) => {
			return state.siderType
		},
		lang: (state) => {
			return state.lang
		}
	},
	actions: {
		updateState(data: any) {
			this.$state = data
			this.updateAppConfig()
		},
		updateAppConfig() {
			const appStore = useAppStore()
			appStore.setData('app-update')
		}
		// login({ commit }, userInfo) {
		// 	return new Promise<void>((resolve, reject) => {
		// 		loginApi(userInfo)
		// 			.then((res) => {
		// 				console.log('登录', res)
		// 				commit('setToken', res.token)
		// 				setTokenTime()
		// 				router.replace('/')
		// 				resolve()
		// 			})
		// 			.catch((err) => {
		// 				reject(err)
		// 			})
		// 	})
		// },
		// // 退出
		// logout({ commit }) {
		// 	commit('setToken', '')
		// 	localStorage.clear()
		// 	router.replace('/login')
		// }
	}
})
