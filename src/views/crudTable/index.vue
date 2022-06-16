<template>
	<el-table :data="tableData" border style="width: 100%">
		<el-table-column type="index" label="序号" width="70" align="center" />
		<el-table-column prop="date" label="时间" width="180" />
		<el-table-column prop="name" label="名称" width="180" />
		<el-table-column prop="number" label="数字" width="180" />
		<el-table-column prop="chooseName" label="单选框" width="180" />
		<el-table-column prop="radioName" label="选择器" width="180" />
		<el-table-column prop="address" label="地址" />
		<el-table-column label="Operations">
			<template #default="scope">
				<el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
				<el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)"
					>删除</el-button
				>
			</template>
		</el-table-column>
	</el-table>
	<Pagination
		:total="pageParams.total"
		:page="pageParams.page"
		:limit="pageParams.limit"
		@pagination="getTableData"
	/>
	<Layer-dialog :layer="layer" @getTableData="getTableData" v-if="layer.show" />
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import Pagination from '@/components/pagination/index.vue'
import LayerDialog from './dialog.vue'
import { mockData } from './enum'
export default defineComponent({
	name: 'crudTable',
	components: {
		Pagination,
		LayerDialog
	},
	setup() {
		// 分页参数, 供table使用
		const pageParams = reactive({ total: 50, page: 1, limit: 10 })

		const tableData = ref([])
		// 弹窗控制器
		const layer = reactive({
			show: false,
			title: '新增',
			showButton: true,
			row: {}
		})

		interface User {
			date: string
			name: string
			address: string
		}

		// 新增弹窗功能
		const handleAdd = () => {
			layer.title = '新增数据'
			layer.show = true
			delete layer.row
		}
		// 编辑弹窗功能
		const handleEdit = (row: object) => {
			console.error('row', row)
			layer.title = '编辑数据'
			layer.row = row
			layer.show = true
		}

		const handleDelete = (index: number, row: User) => {
			console.log(index, row)
		}

		const getTableData = (pages: any) => {
			pageParams.total = mockData.length
			let { page, limit } = pages
			const pageInfo = {
				page, // 页码
				limit // 每页大小
			}

			// 分页参数已拿到，剩下就是你自己调用接口的方法
			tableData.value = mockData.slice((page - 1) * limit, page * limit)
			console.error('tableData', tableData)
		}

		// 初始化时调用
		getTableData(pageParams)

		return {
			tableData,
			pageParams,
			layer,
			handleAdd,
			handleEdit,
			handleDelete,
			getTableData
		}
	}
})
</script>

<style lang="scss" scoped></style>
