import { login as loginApi } from '@/api/login'
import router from '@/router'
import { setTokenTime } from '@/utils/auth'
import { ElMessageBox } from 'element-plus'
import { ref, getCurrentInstance } from 'vue' // 下面有简单解释

// const { proxy } = getCurrentInstance() // 下面有简单解释

const menuList = []
// menuList.value.splice(0, 2)
// console.log('初始化路由表', menuList.value)

export default {
	namespaced: true,
	state: () => ({
		token: localStorage.getItem('token') || '',
		siderType: true, // 左侧导航栏初始状态
		lang: localStorage.getItem('lang') || 'zh',
		menus: menuList
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
			const { username, password } = userInfo
			return new Promise<void>((resolve, reject) => {
				loginApi({
					username: username.trim(),
					password: password
				})
					.then((res) => {
						console.log('登录成功', res)
						commit('setToken', res?.token)
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
			ElMessageBox.confirm('确认退出当前账户吗？').then(() => {
				commit('setToken', '')
				localStorage.clear()
				sessionStorage.clear()
				router.replace('/login')
			})
		}
	}
}
