<template>
	<div class="main">
		<div v-for="(name, index) in icons" :key="index" class="main-icon" @click="onIcon(name)">
			<el-icon style="font-size: 40px" :title="name">
				<component :index="index" :key="index" :is="name"></component>
			</el-icon>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
import * as ElIcons from '@element-plus/icons-vue'
export default defineComponent({
	components: {},
	props: {
		layer: {
			type: Object,
			default: () => {
				return {}
			}
		}
	},
	setup(props, ctx) {
		const getData = () => {
			console.log('页面挂载了')
			var icons = []
			for (const name in ElIcons) {
				// console.error(name)
				icons.push(name)
			}
			return icons
		}

		const iconsData = reactive(getData())

		const iconList = reactive({
			icons: iconsData
		})
		const data = toRefs(iconList)

		const onIcon = (icon: string) => {
			console.log('icon', icon)
			ctx.emit('getIcon', icon)
		}
		return {
			...data,
			onIcon
		}
	}
})
</script>

<style lang="scss" scoped>
.main {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	height: 260px;
	overflow: auto;
	.main-icon {
		margin: 5px;
		border: solid 1px #f4f4f5;
		border-radius: 5px;
		.icon {
			width: 20px;
			height: 20px;
		}
	}
	.main-icon:hover {
		cursor: pointer;
		border: solid 1px blue;
	}
}
/**修改全局的滚动条*/
/**滚动条的宽度*/
.main::-webkit-scrollbar {
	width: 6px;
}
//滚动条的滑块
.main::-webkit-scrollbar-thumb {
	background-color: #eaecf1;
	border-radius: 3px;
}
</style>
