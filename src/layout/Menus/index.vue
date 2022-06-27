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
		<el-sub-menu :index="item.path" v-for="(item, index) in mockMenu" :key="index">
			<template #title>
				<el-icon>
					<component :is="item.meta.icon"></component>
				</el-icon>
				<span>
					{{ $t(`${item.meta.title}`) }}
				</span>
			</template>

			<el-menu-item
				:index="it.path"
				v-for="it in item.children"
				:key="it.path"
				@click="savePath(it.path)"
			>
				<template #title>
					<el-icon>
						<component :is="it.meta.icon"></component>
					</el-icon>
					<span>
						{{ $t(`${it.meta.title}`) }}
					</span>
				</template>
			</el-menu-item>
		</el-sub-menu>
	</el-menu>
</template>

<script setup lang="ts">
import { menuList } from '@/api/menu'
import store from '@/store'
// import variables from '@/styles/variables.scss'
import { ref, computed, watch, reactive } from 'vue'
import { getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance() // 相当于this
const mockMenu = ref(proxy.$router.options.routes)
mockMenu.value.splice(0, 2)
localStorage.setItem('menus', JSON.stringify(mockMenu.value))
console.log('路由表', mockMenu.value)

//计算左侧导航栏展开/缩放状态
const siderType = computed(() => {
	return !store.getters.siderType
})

// 读取缓存-点击的菜单
const defaultActive = ref(sessionStorage.getItem('path') || 'document')
const initMenuList = async () => {
	// const res = await menuList()
	console.log('menuList')
}

// 缓存-点击的菜单
const savePath = (path: string) => {
	sessionStorage.setItem('path', path)
}
const handleOpen = (key: string, keyPath: string[]) => {
	// console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
	// console.log(key, keyPath)
}

initMenuList()
</script>

<style lang="scss" scoped></style>
