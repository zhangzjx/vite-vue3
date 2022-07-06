<template>
	<div>
		<el-row :gutter="20">
			<el-col :lg="12" :md="24">
				<el-card> <LineChart /></el-card>
			</el-col>
			<el-col :lg="12" :md="24">
				<el-card> <BarChart /></el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BarChart from './charts/barChart.vue'
import LineChart from './charts/lineChart.vue'

export default defineComponent({
	components: {
		BarChart,
		LineChart
	},
	setup() {}
})
</script>

<style lang="scss" scoped></style>
