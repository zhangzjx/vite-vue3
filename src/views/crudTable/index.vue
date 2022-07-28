<template>
	<Search
		ref="searchBar"
		v-model="searchConfig.data"
		:config="searchConfig.config"
		:loading="searchConfig.loading"
		:form-btn="['query', 'reset', 'exerpot']"
		@query="query"
		@reset="reset"
		@insert="insert"
	/>
	<el-table :data="tableData" border style="width: 100%">
		<el-table-column type="index" label="序号" width="70" align="center" />
		<el-table-column prop="date" label="时间" />
		<el-table-column prop="name" label="名称" />
		<el-table-column prop="number" label="数字" />
		<el-table-column prop="chooseName" label="单选框" />
		<el-table-column prop="radioName" label="选择器" />
		<el-table-column prop="address" label="地址" />
		<el-table-column label="Operations" width="180">
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
	<Layer-dialog :layer="layer" @getTableData="getTableData" v-if="layer.layerVisible" />
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import Search from '@/components/base/SearchBar.vue'
import Pagination from '@/components/Pagination/index.vue'
import LayerDialog from './dialog.vue'
import { mockData } from './enum'
export default defineComponent({
	name: 'crudTable',
	components: {
		Search,
		Pagination,
		LayerDialog
	},
	setup() {
		const searchConfig = {
			data: {},
			loading: false,
			config: [
				{
					tag: 'input',
					field: 'xm',
					placeholder: '姓名',
					label: '姓名'
				},
				{
					tag: 'input',
					field: 'gmsfhm',
					placeholder: '身份证号',
					label: '身份证号'
				},
				{
					tag: 'select',
					field: 'gmsfhms',
					placeholder: '单选select',
					label: '单选select',
					options: [
						{
							value: '香蕉',
							label: '香蕉'
						},
						{
							value: '苹果',
							label: '苹果'
						}
					]
				}
			]
		}
		// 分页参数, 供table使用
		const pageParams = reactive({ total: 50, page: 1, limit: 10 })

		const tableData = ref([])
		// 弹窗控制器
		const layer = reactive({
			layerVisible: false,
			layerTitle: '新增',
			showButton: true,
			drag: true,
			row: {}
		})

		interface User {
			date: string
			name: string
			address: string
		}

		// 新增弹窗功能
		const handleAdd = () => {
			layer.layerVisible = true
			layer.layerTitle = '新增数据'
			delete layer.row
		}
		// 编辑弹窗功能
		const handleEdit = (row: object) => {
			console.error('row', row)
			layer.layerVisible = true
			layer.layerTitle = '编辑数据'
			layer.row = row
		}

		const handleDelete = (index: number, row: User) => {
			console.log(index, row)
		}

		const getTableData = (pages: any, form = {}) => {
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

		const query = (data) => {
			// console.log('确定', data)
			const form = { ...data }
			if (form.date) {
				form.startTime = form.date[0]
				form.endTime = form.date[1]
				delete form.date
			}
			Object.keys(form).forEach((key) => {
				if (form[key] === '' || form[key] === undefined) {
					delete form[key]
				}
			})

			// console.log('确定11', form)
			getTableData(pageParams, form)
		}
		const reset = () => {
			console.log('重置')
		}
		function insert() {
			console.log('新增用户')
		}

		// 初始化时调用
		getTableData(pageParams)

		return {
			searchConfig,
			tableData,
			pageParams,
			layer,
			handleAdd,
			handleEdit,
			handleDelete,
			getTableData,
			query,
			reset,
			insert
		}
	}
})
</script>

<style lang="scss" scoped></style>
