import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

/* Layout */
import Layout from '@/layout/index.vue'
const routes: RouteRecordRaw[] = [
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/Login.vue'),
		meta: { title: 'message.system.login', hideTabs: true }
	},

	{
		path: '/',
		name: '/',
		component: Layout,
		redirect: '/document',
		children: [
			// {
			// 	path: 'users',
			// 	name: 'users',
			// 	component: () => import('@/views/users/index.vue')
			// },
			// {
			// 	path: 'categories',
			// 	name: 'categories',
			// 	component: () => import('@/views/categories/index.vue')
			// },
			// {
			// 	path: 'goods',
			// 	name: 'goods',
			// 	component: () => import('@/views/goods/index.vue')
			// },
			// {
			// 	path: 'params',
			// 	name: 'params',
			// 	component: () => import('@/views/params/index.vue')
			// },
			// {
			// 	path: 'rights',
			// 	name: 'rights',
			// 	component: () => import('@/views/rights/index.vue')
			// },
			// {
			// 	path: 'roles',
			// 	name: 'roles',
			// 	component: () => import('@/views/roles/index.vue')
			// }
		],
		meta: { title: 'message.system.login', hideTabs: true }
	},
	// 文档
	{
		path: '/document',
		name: 'document',
		component: Layout,
		redirect: '/intro',
		meta: {
			title: 'message.menu.document.name',
			icon: 'document'
		},
		children: [
			// 使用说明
			{
				path: '/intro',
				name: 'intro',
				component: () => import('@/views/users/index.vue'),
				meta: {
					title: 'message.menu.document.intro',
					icon: 'goods'
				}
			},
			// 首页
			{
				path: '/home',
				name: 'home',
				component: () => import('@/views/home/hello.vue'),
				meta: {
					title: 'message.menu.dashboard.index',
					icon: 'home-filled'
				}
			}
		]
	},
	// 权限管理
	{
		path: '/jurisdiction',
		name: 'jurisdiction',
		component: Layout,
		redirect: '/roles',
		meta: {
			title: 'message.menu.directive.dragable',
			icon: 'setting'
		},
		children: [
			// 角色列表
			{
				path: '/roles',
				name: 'roles',
				component: () => import('@/views/roles/index.vue'),
				meta: {
					title: 'message.menu.directive.copy',
					icon: 'menu'
				}
			},
			// 权限列表
			{
				path: '/rights',
				name: 'rights',
				component: () => import('@/views/rights/index.vue'),
				meta: {
					title: 'message.menu.directive.waterMarker',
					icon: 'apple'
				}
			}
		]
	}
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

export default router
