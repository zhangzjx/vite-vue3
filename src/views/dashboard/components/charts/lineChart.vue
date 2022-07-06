<template>
	<div id="main" ref="refChart" style="width: 100%; height: 40vh"></div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, nextTick } from 'vue'
import * as echarts from 'echarts'

export default defineComponent({
	components: {},
	setup() {
		const refChart = ref(null)
		const configOption = {
			color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
			title: '渐变堆叠面积图',
			legend: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5'],
			xAxisData: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
			seriesData: [
				[120, 282, 111, 234, 220, 340, 310],
				[140, 232, 141, 264, 90, 340, 250]
			]
		}
		const initData = () => {
			// const chartDom = document.getElementById('main')
			const chartDom = refChart.value
			const myChart = echarts.init(chartDom)
			let option

			option = {
				color: configOption.color,
				title: {
					text: configOption.title
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						label: {
							backgroundColor: '#6a7985'
						}
					}
				},
				legend: {
					data: configOption.legend
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: {
					type: 'category',
					boundaryGap: false, // 坐标轴两端空白策略
					data: configOption.xAxisData
				},
				yAxis: {
					type: 'value'
				},
				series: [
					{
						name: 'Line 1',
						type: 'line',
						// stack: 'Total',
						smooth: true,
						lineStyle: {
							width: 0
						},
						showSymbol: false, // 隐藏数据点
						areaStyle: {
							opacity: 0.8,
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
								// 设置渐变色
								{
									offset: 0,
									color: 'rgb(128, 255, 165)'
								},
								{
									offset: 1,
									color: 'rgb(1, 191, 236)'
								}
							])
						},
						emphasis: {
							focus: 'series' //  聚焦当前高亮的数据所在的系列的所有图形
						},
						data: configOption.seriesData[0]
					},
					{
						name: 'Line 2',
						type: 'line',
						// stack: 'Total',
						smooth: true,
						lineStyle: {
							width: 0
						},
						showSymbol: false,
						areaStyle: {
							opacity: 0.8,
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
								{
									offset: 0,
									color: 'rgb(0, 221, 255)'
								},
								{
									offset: 1,
									color: 'rgb(77, 119, 255)'
								}
							])
						},
						emphasis: {
							focus: 'series'
						},
						data: configOption.seriesData[1]
					}
				]
			}

			option && myChart.setOption(option)
			// 根据浏览器大小改变大小
			window.addEventListener('resize', () => {
				// 执行echarts自带的resize方法，即可做到让echarts图表自适应
				myChart.resize()
			})
		}
		// 等待dom挂载完成
		// nextTick(() => {
		// 	initData()
		// })
		onMounted(() => {
			initData()
		})
		return { refChart, configOption, initData }
	}
})
</script>

<style lang="scss" scoped>
.box {
	margin: 10px auto 0;
	width: calc(100% - 40px);
	height: 400px;
	background: var(--system-page-background);
	padding: 20px;
	overflow: hidden;
}
</style>
