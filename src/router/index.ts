import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

/* Layout */
import Layout from '@/layout/index.vue'

/**
* redirect: noredirect        当设置 noredirect 的时候该路由在面包屑导航中不可被点击
* name:'router-name'          设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
* meta : {
    hidden: true              当设置 true 的时候该路由不会再侧边栏出现 如404，login等页面(默认 false)
    alwaysShow: true          当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式，
                              只有一个时，会将那个子路由当做根路由显示在侧边栏，
                              若你想不管路由下面的 children 声明的个数都显示你的根路由，
                              你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，
                              一直显示根路由(默认 false)
    title: 'title'            设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'          设置该路由的图标
    noCache: true             如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    breadcrumb: false         如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
    affix: true               如果设置为true，则会一直固定在tag项中(默认 false)
    noTagsView: true           如果设置为true，则不会出现在tag中(默认 false)
    activeMenu: '/dashboard'  显示高亮的路由路径
    followAuth: '/dashboard'  跟随哪个路由进行权限过滤
    showMainRoute: true       设置为true即使hidden为true，也依然可以进行路由跳转(默认 false)
    followRoute: '/dashboard' 为路由设置跟随其他路由的权限
  }
**/

const routes: RouteRecordRaw[] = [
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/Login.vue'),
		meta: { title: 'message.system.login', menuHide: true }
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
			// 	path: 'roles',
			// 	name: 'roles',
			// 	component: () => import('@/views/roles/index.vue')
			// }
		],
		meta: { title: 'message.system.login', menuHide: true }
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
				component: () => import('@/views/roles/index.vue'),
				meta: {
					title: 'message.menu.table.crudTable',
					icon: 'chicken'
				}
			},
			// 其它表格
			{
				path: '/otherTable',
				name: 'otherTable',
				component: () => import('@/views/params/index.vue'),
				meta: {
					title: 'message.menu.table.otherTable',
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
