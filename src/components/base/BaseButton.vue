<!--
按钮组件
-->
<template>
	<!-- 有文字 -->
	<el-button
		v-if="btnParams.showText"
		:size="buttonSize(btnParams.size)"
		:icon="buttonIcon(textIcon, 'icon')"
		:type="buttonType(type)"
	>
		<span>{{ buttonIcon(textIcon, 'text') }}</span>
	</el-button>
	<!-- 没有文字 -->
	<el-button
		v-else
		:size="buttonSize(btnParams.size)"
		:icon="buttonIcon(textIcon, 'icon')"
		:type="buttonType(type)"
	>
	</el-button>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import {
	Search,
	Refresh,
	Download,
	Upload,
	Plus,
	Edit,
	Delete,
	Star
} from '@element-plus/icons-vue'

import type { ButtonType, ButtonProps } from 'element-plus'
const props = defineProps({
	btnParams: {
		type: Object,
		default: () => {
			return {
				size: 'small', // 按钮大小
				showText: false // 是否展示按钮文字
			}
		}
	},
	textIcon: {
		type: String,
		default: 'add'
	},
	type: {
		type: String,
		default: 'primary'
	}
})

const buttonIcon = (textIcon, str) => {
	let txt = ''
	let icon = ''
	switch (textIcon) {
		case 'search':
			txt = '查询'
			icon = 'Search'
			break
		case 'refresh':
			txt = '重置'
			icon = 'Refresh'
			break
		case 'export':
			txt = '导出'
			icon = 'Download'
			break
		case 'inport':
			txt = '导入'
			icon = 'Upload'
		case 'add':
			txt = '新增'
			icon = 'Plus'
			break
		case 'edit':
			txt = '编辑'
			icon = 'Edit'
			break
		case 'delete':
			txt = '删除'
			icon = 'Delete'
			break
		case 'favorite':
			txt = '收藏'
			icon = 'Star'
			break
	}
	return str === 'icon' ? icon : txt
}
const buttonSize = (size) => {
	const isIn = ['default', 'small', 'large'].includes(size)
	return isIn ? size : 'default'
}

const buttonType = (type) => {
	const isIn = ['text', 'primary', 'default', 'danger', 'success', 'warning', 'info'].includes(type)
	return isIn ? type : 'default'
}

// Object.assign(btnConfig, props.btnParams)
</script>

<style lang="scss" scoped>
.el-button--small {
	padding: 5px;
}
</style>
