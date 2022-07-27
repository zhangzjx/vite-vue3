import router, { resetRouter } from './index'
import { useUserStore } from '@/store/user'

const checkAccessToken = () => false

// 路由守卫
const whiteList = ['/login']
//设置后台异步路由
const setAsyncRouter = async () => {
	const userStore = useUserStore()
	//store中有routes的话无需再请求
	const asyncRoutes =
		userStore.routes.length > 0 ? userStore.routes : await userStore.generateRoutes()
	console.log('routes: ', asyncRoutes)
	// resetRouter()
	router.addRoute(asyncRoutes)
	return asyncRoutes
}

// 路由前置守卫
router.beforeEach((to, from, next) => {
	const userStore = useUserStore()
	if (userStore.token) {
		if (to.path === '/login') {
			next('/')
		} else {
			next()
		}
	} else {
		if (whiteList.includes(to.path)) {
			next()
		} else {
			next('/login')
		}
	}
})
