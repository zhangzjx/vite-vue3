<template>
	<div id="sectList">
		<el-row :gutter="20">
			<el-col :span="24">
				<el-card class="box-card">
					<template #header>
						<div class="card-header">排行榜</div>
					</template>
					<!-- 表格 -->
					<el-table :data="tableData" style="width: 100%">
						<el-table-column prop="id" label="排名" min-width="80"> </el-table-column>
						<el-table-column prop="name" label="姓名"> </el-table-column>
						<el-table-column prop="sectName" label="所属势力"> </el-table-column>
					</el-table>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'

export default defineComponent({
	name: 'BeastCard',
	props: {
		parentInfo: {
			type: Object,
			default: () => {
				return {
					name: '',
					sectName: '',
					address: ''
				}
			}
		},
		msg: { type: String, default: '' }
	},
	setup(props) {
		const tableData = reactive([
			{
				id: '1',
				name: '王铁牛',
				sectName: '金刀门',
				address: '东胜神州傲来国',
				sectLevel: '1',
				createTime: '2016-05-02'
			},
			{
				id: '2',
				name: '王铁牛',
				sectName: '十二连环坞',
				address: '东胜神州傲来国',
				sectLevel: '1',
				createTime: '2016-05-02'
			}
		])
		return {
			tableData
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
