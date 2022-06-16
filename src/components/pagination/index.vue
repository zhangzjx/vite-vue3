<!--
分页组件代码
-->
<template>
	<div :class="{ hidden: hidden }" class="pagination-container scrollBar">
		<el-pagination
			:background="background"
			v-model:current-page="currentPage"
			v-model:page-size="pageSize"
			:layout="layout"
			:page-sizes="pageSizes"
			:total="total"
			v-bind="$attrs"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
		/>
	</div>
</template>

<script lang="ts">
import { nextTick, Prop, ref } from 'vue'
import { defineComponent, computed } from 'vue'
interface Props {
	total: number
	page: number
	limit: number
	pageSizes: Array<any>
	layout: string
	background: boolean
	autoScroll: boolean
	hidden: boolean
}
export default defineComponent({
	name: 'Pagination',
	props: {
		total: {
			required: true,
			type: Number
		},
		page: {
			type: Number,
			default: 1
		},
		limit: {
			type: Number,
			default: 10
		},
		pageSizes: {
			type: Array,
			default() {
				return [10, 20, 30, 50]
			}
		},
		layout: {
			type: String,
			default: 'total, sizes, prev, pager, next, jumper'
		},
		background: {
			type: Boolean,
			default: true
		},
		autoScroll: {
			type: Boolean,
			default: true
		},
		hidden: {
			type: Boolean,
			default: false
		}
	},
	setup(props: Props, { emit }) {
		const currentPage = ref(1)
		const pageSize = ref(10)

		// 分页相关：监听页码切换事件
		const handleSizeChange = (val: number) => {
			pageSize.value = val
			// console.error('pageSize', pageSize)
			emit('pagination', { page: currentPage.value, limit: val })
		}

		// 分页相关：监听单页显示数量切换事件
		const handleCurrentChange = (val: number) => {
			nextTick(() => {
				currentPage.value = val
				// console.error('currentPage', currentPage)
				emit('pagination', { page: val, limit: pageSize.value })
			})
		}
		return {
			currentPage,
			pageSize,
			handleSizeChange,
			handleCurrentChange
		}
	}
})
</script>

<style scoped lang="scss">
// @import '@/styles/index.scss';
.pagination-container {
	width: 100%;
	overflow-x: auto;
	background: #fff;
	padding: 16px 16px 0;
	.el-pagination {
		text-align: right;
	}
}
// .scrollBar {
// 	@include scrollBar;
// }
.pagination-container.hidden {
	display: none;
}
</style>
