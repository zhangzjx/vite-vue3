<!--
 * @Description: 后台视图入口
-->
<template>
	<el-container class="app-wrapper">
		<el-aside :width="asideWidth" class="sidebar-container">
			<Menu />
		</el-aside>
		<el-container class="container" :class="{ hidderContainer: !isSider }">
			<el-header><Headers /></el-header>
			<el-main><router-view /></el-main>
			<el-footer><Footer /></el-footer>
		</el-container>
	</el-container>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Headers from './Headers/index.vue'
import Menu from './Menus/index.vue'
import Footer from './Footer/footer.vue'
import variables from '@/style/variables.scss'
import { useConfigStore } from '@/store/config'
import { storeToRefs } from 'pinia'
const userStore = useConfigStore()
const { isSider } = storeToRefs(userStore)

const asideWidth = computed(() => {
	return userStore.isSider ? '230px' : '67px'
	console.log(variables)
})
</script>

<style lang="scss" scoped>
.app-container {
	position: relative;
	width: 100%;
	height: 100%;
}
.container {
	width: calc(100% - $sideBarWidth);
	height: 100%;

	position: fixed;
	top: 0;
	right: 0;
	z-index: 9;
	transition: all 0.28s;

	&.hidderContainer {
		width: calc(100% - $hideSideBarWidth);
	}
}
::deep .el-header {
	padding: 0;
}
</style>
