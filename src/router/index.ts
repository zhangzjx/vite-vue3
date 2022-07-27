import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

/* Layout */
import Layout from '@/layout/index.vue'

// 静态路由
import constantRoutes from '@/router/constantRouter'

const routes: RouteRecordRaw[] = constantRoutes

const router = createRouter({
	history: createWebHashHistory(),
	routes
})
//重置路由
export const resetRouter = () => {
	const newRouter = createRouter({
		history: createWebHashHistory(),
		routes
	})
	// router.matcher = newRouter.matcher // 解决多次addRoutes引起的路由重叠
}
export default router
