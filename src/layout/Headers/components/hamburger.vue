<template>
	<!-- 汉堡按钮 -->
	<div class="hamburger-container" id="hamburger" @click="toggleClick">
		<svg-icon :name="icon"></svg-icon>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import store from '@/store'

// 改变按钮状态
const toggleClick = () => {
	store.commit('app/changeSiderType')
}
const icon = computed(() => {
	return store.getters.siderType ? 'hamburger-opened' : 'hamburger-closed'
})
</script>

<style lang="scss" scoped>
.hamburger-container {
	margin-right: 16px;
	box-sizing: border-box;
	cursor: pointer;
}
</style>
