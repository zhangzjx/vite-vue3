import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
	// {
	// 	path: '/',
	// 	name: '/',
	// 	component: () => import('@/layout/index.vue')
	// },
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/Login.vue')
	},

	{
		path: '/',
		name: '/',
		component: () => import('@/layout/index.vue'),
		redirect: '/users',
		children: [
			{
				path: 'users',
				name: 'users',
				component: () => import('@/views/users/index.vue')
			},
			{
				path: 'categories',
				name: 'categories',
				component: () => import('@/views/categories/index.vue')
			},
			{
				path: 'goods',
				name: 'goods',
				component: () => import('@/views/goods/index.vue')
			},
			{
				path: 'params',
				name: 'params',
				component: () => import('@/views/params/index.vue')
			},
			{
				path: 'rights',
				name: 'rights',
				component: () => import('@/views/rights/index.vue')
			},
			{
				path: 'roles',
				name: 'roles',
				component: () => import('@/views/roles/index.vue')
			}
		]
	}
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

export default router
