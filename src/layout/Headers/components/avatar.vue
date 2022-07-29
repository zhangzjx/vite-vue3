<template>
	<el-dropdown>
		<span class="el-dropdown-link">
			<el-avatar shape="square" :size="40" :src="squareUrl"></el-avatar>
		</span>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item @click="logout">{{ $t('message.system.loginOut') }}</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/store/user'
const squareUrl = ref('src/assets/avatar.png')
const userStore = useUserStore()

const logout = () => {
	userStore.logout()
}
</script>

<style lang="scss" scoped>
:deep .el-dropdown-menu__item {
	white-space: nowrap;
}
</style>
