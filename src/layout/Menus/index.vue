<template>
	<el-menu
		active-text-color="#ffd04b"
		background-color="#304156"
		class="el-menu-vertical-demo"
		:default-active="defaultActive"
		text-color="#fff"
		@open="handleOpen"
		@close="handleClose"
		router
		unique-opened
		:collapse="siderType"
	>
		<el-sub-menu :index="item.id" v-for="(item, index) in mockMenu" :key="item.id">
			<template #title>
				<el-icon>
					<component :is="item.icon"></component>
				</el-icon>
				<span>{{ item.authName }}</span>
			</template>

			<el-menu-item
				:index="'/' + it.path"
				v-for="it in item.children"
				:key="it.id"
				@click="savePath(it.path)"
			>
				<template #title>
					<el-icon>
						<component :is="it.icon"></component>
					</el-icon>
					<span>{{ $t(`menus.${it.path}`) }}</span>
				</template>
			</el-menu-item>
		</el-sub-menu>
	</el-menu>
</template>

<script setup lang="ts">
import { menuList } from '@/api/menu'
import store from '@/store'
// import variables from '@/styles/variables.scss'
import { ref, computed } from 'vue'

const iconList = ref(['user', 'setting', 'shop', 'tickets', 'pie-chart'])
const icon = ref('menu')

const mockMenu = ref([
	{
		authName: '用户管理',
		children: [
			{
				id: 110,
				authName: '用户列表',
				path: 'users',
				children: [],
				order: null,
				icon: 'goods'
			},
			{
				id: 111,
				authName: '首页',
				path: 'home',
				children: [],
				order: null,
				icon: 'goods'
			}
		],
		id: 125,
		order: 1,
		path: 'users',
		icon: 'user'
	},
	{
		authName: '权限管理',
		children: [
			{
				id: 111,
				authName: '角色列表',
				path: 'roles',
				children: [],
				order: null,
				icon: 'setting'
			},
			{
				id: 112,
				authName: '权限列表',
				path: 'rights',
				children: [],
				order: null,
				icon: 'setting'
			}
		],
		id: 103,
		order: 2,
		path: 'rights',
		icon: 'setting'
	},
	{
		authName: '商品管理',
		children: [
			{ id: 104, authName: '商品列表', path: 'goods', children: [], order: 1, icon: 'apple' },
			{
				id: 115,
				authName: '分类参数',
				path: 'params',
				children: [],
				order: 2,
				icon: 'goods'
			},
			{
				id: 121,
				authName: '商品分类',
				path: 'categories',
				children: [],
				order: 3,
				icon: 'goods'
			}
		],
		id: 101,
		order: 3,
		path: 'goods',
		icon: 'setting'
	}
])

//计算左侧导航栏展开/缩放状态
const siderType = computed(() => {
	return !store.getters.siderType
})

// 读取缓存-点击的菜单
const defaultActive = ref(sessionStorage.getItem('path') || '/users')
const initMenuList = async () => {
	const res = await menuList()
	console.log('menuList', res)
}

initMenuList()

// 缓存-点击的菜单
const savePath = (path: string) => {
	sessionStorage.setItem('path', `/${path}`)
}
const handleOpen = (key: string, keyPath: string[]) => {
	// console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
	// console.log(key, keyPath)
}
</script>

<style lang="scss" scoped></style>
