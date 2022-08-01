<!--
弹窗组件代码
-->
<template>
	<div>
		<el-dialog
			ref="dialog"
			v-model="dialogInfo.layerVisible"
			:title="dialogInfo.layerTitle"
			:width="dialogInfo.width"
			center
			:draggable="dialogInfo.drag"
			:close-on-click-modal="dialogInfo.closeOnClickModal"
			:close-on-press-escape="dialogInfo.closeOnPressEscape"
			:before-close="close"
		>
			<slot></slot>
			<template #footer v-if="dialogInfo.showButton">
				<div>
					<el-button @click="close">取消</el-button>
					<el-button type="primary" @click="confirm">确认</el-button>
				</div>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue'

export default defineComponent({
	props: {
		layer: {
			type: Object,
			default: () => {
				return {}
			},
			required: true
		}
	},
	directives: {},
	setup(props, ctx) {
		const dialogInfo = reactive({
			layerVisible: false,
			layerTitle: '',
			drag: false, // 启用可拖拽功能
			closeOnClickModal: true, // 	是否可以通过点击 modal 关闭 Dialog
			closeOnPressEscape: true, //	是否可以通过按下 ESC 关闭 Dialog
			showButton: false,
			width: '50%'
		})

		Object.assign(dialogInfo, props.layer)
		const dialog = ref(null) as any
		const confirm = () => {
			ctx.emit('confirm')
		}
		const close = () => {
			ctx.emit('close')
		}
		return {
			dialog,
			dialogInfo,
			confirm,
			close
		}
	}
})
</script>

<style lang="scss" scoped></style>
