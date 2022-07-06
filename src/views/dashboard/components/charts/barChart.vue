<template>
	<div id="main" ref="refChart" style="width: 100%; height: 40vh"></div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, nextTick } from 'vue'
import * as echarts from 'echarts'
import tools from '@/utils/autoTooltip' // 引入

export default defineComponent({
	components: {},
	setup() {
		const refChart = ref(null)

		const configOption = {
			color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
			title: '渐变堆叠面积图',
			legend: ['Line 1', 'Line 2'],
			xAxisData: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
			seriesData: [[10, 52, 200, 334, 390, 330, 220]]
		}
		const initData = () => {
			// const chartDom = document.getElementById('main')
			const chartDom = refChart.value
			const myChart = echarts.init(chartDom)
			let option

			option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow'
					}
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: [
					{
						type: 'category',
						data: configOption.xAxisData,
						axisTick: {
							alignWithLabel: true
						}
					}
				],
				yAxis: [
					{
						type: 'value',
						name: '数量'
					}
				],
				series: [
					{
						name: 'Direct',
						type: 'bar',
						barWidth: '60%',
						data: configOption.seriesData[0]
					}
				]
			}

			option && myChart.setOption(option)
			// 根据浏览器大小改变大小
			window.addEventListener('resize', () => {
				// 执行echarts自带的resize方法，即可做到让echarts图表自适应
				myChart.resize()
				// 如果有多个echarts，就在这里执行多个echarts实例的resize方法,不过一般要做组件化开发，即一个.vue文件只会放置一个echarts实例
				/*
			  this.myChart2.resize();
			  this.myChart3.resize();
			  ......
			  */
			})

			tools.autoHover(myChart, option, configOption.seriesData[0].length, 3000) // 固定写法
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
