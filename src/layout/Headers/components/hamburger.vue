<template>
	<!-- 汉堡按钮 -->
	<div class="hamburger-container" id="hamburger" @click="toggleClick">
		<svg-icon :name="icon"></svg-icon>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useConfigStore } from '@/store/config'
const userStore = useConfigStore()
// 改变按钮状态
const toggleClick = () => {
	userStore.updateSider(!userStore.isSider)
}
const icon = computed(() => {
	return userStore.isSider ? 'hamburger-opened' : 'hamburger-closed'
})
</script>

<style lang="scss" scoped>
.hamburger-container {
	margin-right: 16px;
	box-sizing: border-box;
	cursor: pointer;
}
</style>
