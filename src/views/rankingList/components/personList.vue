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
								<el-link type="primary" @click="openUserCard(row.id, 'left')">{{
									row.name
								}}</el-link>
							</template>
						</el-table-column>
						<el-table-column label="种族" prop="race"> </el-table-column>
						<el-table-column label="擅长兵器" prop="weaponName"> </el-table-column>
						<el-table-column label="所属势力" prop="sectName"> </el-table-column>
					</el-table>
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
								<el-link type="primary" @click="openUserCard(row.id, 'right')">{{
									row.name
								}}</el-link>
							</template>
						</el-table-column>
						<el-table-column label="所属势力" prop="race"> </el-table-column>
					</el-table>
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
import { defineComponent, ref, reactive, nextTick } from 'vue'
import UserCard from './userCard.vue'
import BeastCard from './beastCard.vue'
import { personData } from './personData'
import { beastData } from './beastData'

export default defineComponent({
	name: 'BeastList',
	components: { UserCard, BeastCard },
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
		let tableBeast = reactive([])
		let params = reactive({})
		// let params = ref({})
		const openUserCard = (id, type) => {
			dialogVisible.value = true
			activiteCom.value = type === 'left' ? 'UserCard' : 'BeastCard'
			// params.value = tableData[0] // 可以使用ref形式赋值
			// params = tableData[0]  // 直接赋值子组件取不到值
			Object.assign(params, tableData[id - 1])
			console.error('params', params)
		}

		const initData = () => {
			getPeopleData()
			getBeastData()
		}
		const getPeopleData = () => {
			// 随机数 = Math.floor(Math.random() * 可能的总数 + 第一个可能的值)
			personData.map((item, index) => (item.level = Math.floor(Math.random() * 100 + 1)))
			personData.sort((a, b) => {
				return b.level - a.level
			})

			personData.forEach((item, index) => (item['id'] = index + 1))
			tableData = personData
			console.error('tableData', tableData)
		}
		const getBeastData = () => {
			// 随机数 = Math.floor(Math.random() * 可能的总数 + 第一个可能的值)
			beastData.map((item, index) => (item.level = Math.floor(Math.random() * 100 + 1)))
			beastData.sort((a, b) => {
				return b.level - a.level
			})

			beastData.forEach((item, index) => (item['id'] = index + 1))
			tableBeast = beastData
			console.error('tableBeast', tableBeast)
		}
		initData()
		return {
			dialogVisible,
			activiteCom,
			tableData,
			tableBeast,
			params,
			openUserCard,
			initData
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
