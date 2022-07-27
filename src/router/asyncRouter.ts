// asyncRouter.ts
import Layout from '@/layout/index.vue'
const asynctRoutes = [
	// 控制台
	{
		path: '/control',
		name: 'control',
		component: Layout,
		redirect: '/dashboard',
		meta: {
			title: 'message.menu.control.name',
			icon: 'DataAnalysis'
		},
		children: [
			// 仪表板
			{
				path: '/dashboard',
				name: 'dashboard',
				component: () => import('@/views/dashboard/index.vue'),
				meta: {
					title: 'message.menu.control.dashboard',
					icon: 'Grape'
				}
			}
		]
	},
	// 文档
	{
		path: '/document',
		name: 'document',
		component: Layout,
		redirect: '/document/intro',
		meta: {
			title: 'message.menu.document.name',
			icon: 'document'
		},
		children: [
			// 其它
			{
				path: '/document/home',
				name: 'home',
				component: () => import('@/views/home/home.vue'),
				meta: {
					title: 'message.menu.dashboard.index',
					icon: 'home-filled'
				}
			},
			// 使用说明
			{
				path: '/document/intro',
				name: 'intro',
				component: () => import('@/views/document/intro.vue'),
				meta: {
					title: 'message.menu.document.intro',
					icon: 'goods'
				}
			},
			// 路由菜单配置
			{
				path: '/document/menu',
				name: 'menu',
				component: () => import('@/views/document/menu.vue'),
				meta: {
					title: 'message.menu.document.menu',
					icon: 'home-filled'
				}
			}
		]
	},
	// 系统管理
	{
		path: '/systemManage',
		name: 'systemManage',
		component: Layout,
		redirect: '/roles',
		meta: {
			title: 'message.menu.systemManage.name',
			icon: 'setting'
		},
		children: [
			// 菜单
			{
				path: '/goods',
				name: 'goods',
				component: () => import('@/views/goods/index.vue'),
				meta: {
					title: 'message.menu.systemManage.menu',
					icon: 'menu'
				}
			},
			// 角色
			{
				path: '/role',
				name: 'role',
				component: () => import('@/views/roles/index.vue'),
				meta: {
					title: 'message.menu.systemManage.role',
					icon: 'apple'
				}
			},
			// 用户
			{
				path: '/user',
				name: 'user',
				component: () => import('@/views/params/index.vue'),
				meta: {
					title: 'message.menu.systemManage.user',
					icon: 'user'
				}
			}
		]
	},
	// 表格
	{
		path: '/table',
		name: 'table',
		component: Layout,
		redirect: '/crudTable',
		meta: {
			title: 'message.menu.table.name',
			icon: 'apple'
		},
		children: [
			// 业务表格
			{
				path: '/crudTable',
				name: 'crudTable',
				component: () => import('@/views/crudTable/index.vue'),
				meta: {
					title: 'message.menu.table.crudTable',
					icon: 'chicken'
				}
			},
			// 其它表格
			{
				path: '/otherTable',
				name: 'otherTable',
				component: () => import('@/views/rankingList/rankmain.vue'),
				meta: {
					title: 'message.menu.table.otherTable',
					icon: 'apple'
				}
			}
		]
	}
]

export default asynctRoutes
