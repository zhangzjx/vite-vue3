<template>
	<el-card class="box-card">
		<Search
			ref="searchBar"
			v-model="searchConfig.data"
			:config="searchConfig.config"
			:loading="searchConfig.loading"
			:form-btn="['query', 'reset', 'insert', 'export']"
			@query="query"
			@reset="reset"
			@insert="handleAdd"
		>
		</Search>

		<el-table
			:data="tableData"
			row-key="id"
			border
			fit
			:expand-row-keys="expandRow"
			@expand-change="onExpandChange"
		>
			<el-table-column type="index" label="序号" width="70" align="center" />
			<el-table-column prop="name" label="名称" min-width="180">
				<template #default="scope"> {{ $t(`${scope.row.meta.title}`) }}</template>
			</el-table-column>
			<el-table-column prop="meta" label="图标" width="70" align="center">
				<template #default="scope">
					<el-icon><component :is="scope.row.meta.icon" /></el-icon>
					<!-- <svg-icon name="apple"></svg-icon> -->
				</template>
			</el-table-column>
			<el-table-column prop="path" label="路径" align="center" />
			<el-table-column prop="path" label="类型" align="center" />
			<el-table-column prop="path" label="更新时间" align="center" min-width="100">
				<template #default="scope"> 2022-08-01 20:36:06 </template>
			</el-table-column>
			<el-table-column label="操作" align="center">
				<template #default="scope">
					<BaseButton :text-icon="`edit`"></BaseButton>
					<BaseButton :text-icon="`delete`" :type="`danger`"></BaseButton>
				</template>
			</el-table-column>
		</el-table>
		<Pagination
			:total="pageParams.total"
			:page="pageParams.page"
			:limit="pageParams.limit"
			@pagination="getTableData"
		/>
	</el-card>

	<Layer-dialog
		v-if="layer.layerVisible"
		:layer="layer"
		@getTableData="getTableData"
		@close="close"
	/>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import Search from '@/components/base/SearchBar.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import Pagination from '@/components/Pagination/index.vue'
import LayerDialog from './dialog.vue'
import menu from '@/i18n/modules/zh-cn/menu'

export default defineComponent({
	name: 'crudTable',
	components: {
		Search,
		Pagination,
		LayerDialog,
		BaseButton
	},

	setup() {
		const searchConfig = {
			data: {},
			loading: false,
			config: [
				{
					tag: 'input',
					field: 'mc',
					placeholder: '名称',
					label: '名称'
				},
				{
					tag: 'input',
					field: 'mc',
					placeholder: '名称',
					label: '名称'
				},
				{
					tag: 'select',
					field: 'gmsfhms',
					placeholder: '单选select',
					label: '单选select',
					value: ['香蕉'],
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
		// 默认展开行
		let expandRow = ref(['0'])

		const refTable = ref()
		// 分页参数, 供table使用
		const pageParams = reactive({ total: 50, page: 1, limit: 10 })
		//菜单数据
		const menuData = JSON.parse(localStorage.getItem('menus'))

		let tableData = ref([])
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

		onMounted(() => {
			console.log(refTable.value) // Proxy {…}
		})

		// 切换展开行
		const onExpandChange = (row, expandedRows) => {
			// 点击先清空数组 全部合起来
			expandRow.value = []
			// 点击之前 expandedRows 分为 true / false
			if (expandedRows) {
				// ture 代表之前是合起状态 现在要展开起来
				// 找到父节点一起放进数组
				expandRow.value.push(String(row.id))
				// expandRow.value.push(String(row.pid))
			} else {
				// false 代表要合起来，
				//如果是根节点，根节点的pid不在列表所以无效,就算放进数组也没用
				// 如果是叶子节点 把pid 放进数组 代表只合起自己，当前节点的根节点还是会展开
				// expandRow.value.push(String(row.pid))
			}
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
		const close = () => {
			layer.layerVisible = false
		}

		const handleDelete = (index: number, row: User) => {
			console.log(index, row)
		}

		const getTableData = (pages: any, form = {}) => {
			layer.layerVisible = false
			pageParams.total = menuData.length
			let { page, limit } = pages
			const pageInfo = {
				page, // 页码
				limit // 每页大小
			}
			console.log('form', form)
			// 分页参数已拿到，剩下就是你自己调用接口的方法
			let res = menuData.slice((page - 1) * limit, page * limit)
			for (let i = 0; i < res.length; i++) {
				res[i]['id'] = i + 1
			}
			tableData.value = res
			console.error('res', tableData)
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
			expandRow,
			menuData,
			tableData,
			pageParams,
			layer,
			onExpandChange,
			handleAdd,
			handleEdit,
			handleDelete,
			getTableData,
			query,
			reset,
			insert,
			close
		}
	}
})
</script>

<style lang="scss" scoped></style>
