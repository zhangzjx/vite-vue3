import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

/* Layout */
import Layout from '@/layout/index.vue'
const routes: RouteRecordRaw[] = [

	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/Login.vue')
	},

	{
		path: '/',
		name: '/',
		component: Layout,
		redirect: '/userManage',
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
		]
	},
	// 用户管理
	{
		path: '/userManage',
		name: 'userManage',
		component: Layout,
		redirect: '/users',
		meta: {
			title: '用户管理'
		},
		children: [
			// 用户管理
			{
				path: '/users',
				name: 'users',
				component: () => import('@/views/users/index.vue'),
				meta: {
					title: '用户管理'
				}
			},
			// 首页
			{
				path: '/home',
				name: 'home',
				component: () => import('@/views/home/hello.vue'),
				meta: {
					title: '首页'
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
			title: '权限管理'
		},
		children: [
			// 角色列表
			{
				path: '/roles',
				name: 'roles',
				component: () => import('@/views/roles/index.vue'),
				meta: {
					title: '角色列表'
				}
			},
			// 权限列表
			{
				path: '/rights',
				name: 'rights',
				component: () => import('@/views/rights/index.vue'),
				meta: {
					title: '权限列表'
				}
			}
		]
	},
	// 商品管理
	{
		path: '/goodsManage',
		name: 'goodsManage',
		component: Layout,
		redirect: '/goods',
		meta: {
			title: '商品管理'
		},
		children: [
			// 商品列表
			{
				path: '/goods',
				name: 'goods',
				component: () => import('@/views/goods/index.vue'),
				meta: {
					title: '商品列表'
				}
			},
			//分类参数
			{
				path: '/params',
				name: 'params',
				component: () => import('@/views/params/index.vue'),
				meta: {
					title: '分类参数'
				}
			},
			//商品分类
			{
				path: '/categories',
				name: 'categories',
				component: () => import('@/views/categories/index.vue'),
				meta: {
					title: '商品分类'
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
