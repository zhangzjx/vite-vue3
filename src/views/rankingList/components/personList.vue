<template>
	<div id="sectList">
		<el-row :gutter="20">
			<el-col :span="12">
				<el-card class="box-card">
					<template #header>
						<div class="card-header">排行榜</div>
					</template>
					<!-- 表格 -->
					<el-table :data="tableData" style="width: 100%">
						<el-table-column label="排名" min-width="80">
							<template v-slot="{ row }">
								<span>{{ row.id }}</span>
							</template>
						</el-table-column>
						<el-table-column label="姓名">
							<template v-slot="{ row }">
								<el-link type="primary" @click="openCard(row.id, 'left')">{{ row.name }}</el-link>
							</template>
						</el-table-column>
						<el-table-column label="种族" prop="race"> </el-table-column>
						<el-table-column label="擅长兵器" prop="weaponName"> </el-table-column>
						<el-table-column label="所属势力" prop="sectName"> </el-table-column>
					</el-table>
					<Pagination
						:total="pageParams.total"
						:page="pageParams.page"
						:limit="pageParams.limit"
						@pagination="getPeopleData"
					/>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card class="box-card">
					<template #header>
						<div class="card-header">排行榜2</div>
					</template>
					<!-- 表格 -->
					<el-table :data="tableBeast" style="width: 100%">
						<el-table-column label="排名" min-width="80">
							<template v-slot="{ row }">
								<span>{{ row.id }}</span>
							</template>
						</el-table-column>
						<el-table-column label="姓名">
							<template v-slot="{ row }">
								<el-link type="primary" @click="openCard(row.id, 'right')">{{ row.name }}</el-link>
							</template>
						</el-table-column>
						<el-table-column label="所属势力" prop="race"> </el-table-column>
					</el-table>
					<Pagination
						:total="pageParams2.total"
						:page="pageParams2.page"
						:limit="pageParams2.limit"
						@pagination="getBeastData"
					/>
				</el-card>
			</el-col>
		</el-row>
		<!-- 个人信息 -->
		<el-dialog
			title="信息"
			v-model="dialogVisible"
			width="40%"
			center
			:append-to-body="true"
			style="height: 900px; border: solid 1px red"
		>
			<component :is="activiteCom" :parentInfo="params"></component>
		</el-dialog>

		<!-- 其它 -->
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, nextTick, toRefs } from 'vue'
import UserCard from './userCard.vue'
import BeastCard from './beastCard.vue'
import Pagination from '@/components/Pagination/index.vue'
import { setDefaulttData, getDefaultData, loadData } from '@/mock/main'

export default defineComponent({
	name: 'BeastList',
	components: { UserCard, BeastCard, Pagination },
	setup(props) {
		let dialogVisible = ref(false)
		let activiteCom = ref('UserCard')
		let tableData = reactive([
			// {
			// 	// id: 1,
			// 	name: '王铁牛',
			// 	sectName: '银刀门',
			// 	address: '东胜神州傲来国',
			// 	sectLevel: '1'
			// }
		])
		const baseData = getDefaultData()
		let personData = baseData.personData
		let beastData = baseData.beastData
		// 分页参数, 供table使用
		const pageParams = reactive({ total: 50, page: 1, limit: 10 })
		const pageParams2 = reactive({ total: 50, page: 1, limit: 10 })

		let tableBeast = reactive([])
		let params = reactive({})

		const openCard = (id, type) => {
			dialogVisible.value = true
			activiteCom.value = type === 'left' ? 'UserCard' : 'BeastCard'
			// params.value = tableData[0] // 可以使用ref形式赋值
			// params = tableData[id - 1]  // 直接赋值子组件取不到值
			Object.assign(params, tableData[id - 1])
			console.log('params', params)
		}

		const initData = () => {
			personData = loadData(personData)
			beastData = loadData(beastData)
			getPeopleData(pageParams)
			getBeastData(pageParams2)
		}

		const getPeopleData = (pages: any, form = {}) => {
			console.error('tableData')
			pageParams.total = personData.length
			let { page, limit } = pages
			const pageInfo = {
				page, // 页码
				limit // 每页大小
			}
			// 分页参数已拿到，剩下就是你自己调用接口的方法
			tableData = personData.slice((page - 1) * limit, page * limit)
			console.log('tableData', tableData)
		}

		const getBeastData = (pages: any, form = {}) => {
			pageParams2.total = beastData.length
			let { page, limit } = pages
			const pageInfo = {
				page, // 页码
				limit // 每页大小
			}
			tableBeast = beastData.slice((page - 1) * limit, page * limit)
			console.log('tableBeast', tableBeast)
		}
		initData()
		return {
			dialogVisible,
			activiteCom,
			tableData,
			tableBeast,
			pageParams,
			pageParams2,
			params,
			openCard,
			initData,
			getPeopleData,
			getBeastData
		}
	}
})
</script>

<style lang="scss" scoped>
.el-row {
	margin-bottom: 20px;
	&:last-child {
		margin-bottom: 0;
	}
}
.el-col {
	border-radius: 4px;
}
.row-bg {
	padding: 10px 0;
	background-color: #f9fafc;
}
#sectList {
	padding: 6px 0px;
}
.card-header {
	justify-content: space-between;
	align-items: center;
	text-align: center;
}

.text {
	font-size: 14px;
}

.item {
	margin-bottom: 18px;
}

// .box-card {
//   width: 480px;
// }
.el-table td,
.el-table th {
	text-align: center;
}
</style>
