import { login as loginApi } from '@/api/login'
import router from '@/router'
import { setTokenTime } from '@/utils/auth'
export default {
	namespaced: true,
	state: () => ({
		token: localStorage.getItem('token') || '',
		siderType: true, // 左侧导航栏初始状态
		lang: localStorage.getItem('lang') || 'zh'
	}),
	mutations: {
		setToken(state, token) {
			state.token = token
			localStorage.setItem('token', token)
		},
		changeSiderType(state) {
			state.siderType = !state.siderType
		},
		changLang(state, lang) {
			state.lang = lang
		}
	},
	actions: {
		login({ commit }, userInfo) {
			return new Promise<void>((resolve, reject) => {
				loginApi(userInfo)
					.then((res) => {
						console.log('登录', res)
						commit('setToken', res.token)
						setTokenTime()
						router.replace('/')
						resolve()
					})
					.catch((err) => {
						reject(err)
					})
			})
		},
		// 退出
		logout({ commit }) {
			commit('setToken', '')
			localStorage.clear()
			router.replace('/login')
		}
	}
}
