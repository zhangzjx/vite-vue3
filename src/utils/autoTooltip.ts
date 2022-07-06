/**
 *  echarts tooltip 自动轮播
 *  @author
 *  @param myChart  // 初始化echarts的实例
 *  @param option   // 指定图表的配置项和数据
 *  @param num      // 类目数量(原因：循环时达到最大值后，使其从头开始循环)
 *  @param time     // 轮播间隔时长
 */
export function autoHover(myChart, option, num, time) {
	var defaultData = {
		// 设置默认值
		time: 2000,
		num: 0
	}
	if (!time) {
		time = defaultData.time
	}
	if (!num) {
		num = defaultData.num
	}

	let count = 0 // 当前位置的下标
	let timeTicket = null
	timeTicket && clearInterval(timeTicket)
	timeTicket = setInterval(function () {
		// 取消之前高亮的图形
		myChart.dispatchAction({
			type: 'downplay',
			seriesIndex: 0, // serieIndex的索引值   可以触发多个
			dataIndex: count
		})
		count = count % num // 增加
		// 高亮当前图形
		myChart.dispatchAction({
			type: 'highlight',
			seriesIndex: 0,
			dataIndex: count
		})
		// 显示 tooltip
		myChart.dispatchAction({
			type: 'showTip',
			seriesIndex: 0,
			dataIndex: count
		})
		count++
		if (count >= num) {
			count = 0
		}
	}, time)
	// 鼠标移入
	myChart.on('mouseover', function (params) {
		clearInterval(timeTicket)
		myChart.dispatchAction({
			type: 'downplay',
			seriesIndex: 0
		})
		myChart.dispatchAction({
			type: 'highlight',
			seriesIndex: 0,
			dataIndex: params.dataIndex
		})
		myChart.dispatchAction({
			type: 'showTip',
			seriesIndex: 0,
			dataIndex: params.dataIndex
		})
	})
	// 鼠标移出
	myChart.on('mouseout', function () {
		timeTicket && clearInterval(timeTicket)
		timeTicket = setInterval(function () {
			myChart.dispatchAction({
				type: 'downplay',
				seriesIndex: 0 // serieIndex的索引值   可以触发多个
			})
			myChart.dispatchAction({
				type: 'highlight',
				seriesIndex: 0,
				dataIndex: count
			})
			myChart.dispatchAction({
				type: 'showTip',
				seriesIndex: 0,
				dataIndex: count
			})
			count++
			if (count >= num) {
				count = 0
			}
		}, 3000)
	})
}

export default {
	autoHover
}
