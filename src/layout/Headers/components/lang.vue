<template>
	<el-dropdown @command="handleCommand">
		<svg-icon name="language"></svg-icon>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item command="zh" :disabled="currentLanguage === 'zh'">中文</el-dropdown-item>
				<el-dropdown-item command="en" :disabled="currentLanguage === 'en'"
					>English</el-dropdown-item
				>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { useConfigStore } from '@/store/config'
const userStore = useConfigStore()

const i18n = useI18n()
const currentLanguage = computed(() => {
	return i18n.locale.value
})

const handleCommand = (val) => {
	i18n.locale.value = val
	userStore.updateLang(val)
}
</script>

<style lang="scss" scoped></style>
