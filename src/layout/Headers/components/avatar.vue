<template>
	<el-dropdown>
		<span class="el-dropdown-link">
			<el-avatar shape="square" :size="40" :src="squareUrl"></el-avatar>
		</span>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item @click="logout">退出</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import store from '@/store'
// import { useUserStore } from '@/store/user'

const squareUrl = ref(
	'https://img0.baidu.com/it/u=1056811702,4111096278&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
)

// const userStore = useUserStore()

const logout = () => {
	// userStore.logout()
	store.dispatch('app/logout')
}
</script>

<style lang="scss" scoped>
::v-deep .el-dropdown-menu__item {
	white-space: nowrap;
}
</style>
