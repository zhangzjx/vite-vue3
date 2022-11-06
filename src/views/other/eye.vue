<!--
 * @Description: eye
-->
<template>
	<div id="box-card">
		<div class="eyeSocket eyeSocketSleeping" id="bigEye">
			<div id="eyeball"></div>
		</div>

		<div class="filter">
			<!-- 添加滤镜的元素 -->
			<div class="eyeSocket" id="eyeFilter">
				<!-- 大眼替身 -->
			</div>
		</div>
		<!-- Svg滤镜 -->
		<svg width="0">
			<filter id="filter">
				<feTurbulence baseFrequency="1">
					<animate
						id="animate1"
						attributeName="baseFrequency"
						dur="1s"
						from="0.5"
						to="0.55"
						begin="0s;animate1.end"
					></animate>
					<animate
						id="animate2"
						attributeName="baseFrequency"
						dur="1s"
						from="0.55"
						to="0.5"
						begin="animate2.end"
					></animate>
				</feTurbulence>
				<feDisplacementMap
					in="SourceGraphic"
					scale="50"
					xChannelSelector="R"
					yChannelSelector="B"
				/>
			</filter>
		</svg>
	</div>
</template>
<script lang="ts" setup>
import { defineComponent, ref, reactive, onMounted, nextTick } from 'vue'
import * as echarts from 'echarts'
var bigEye // 获取元素
var eyeFilter // 获取元素
var eyeball

// ...其他代码
let leftRotSize = 0 // 旋转角度(转圈速度)
let ballSize = 0 // 眼睛尺寸
let rotTimer // 定时器
let isSleep = true // 是否处于休眠状态
let ballColor = 'transparent' // 默认透明，其实默认是啥都无所谓，反正看不见
let sleepTimer // 休眠定时器

// 画眼球
const getEyeballChart = () => {
	let eyeballChart = echarts.getInstanceByDom(document.getElementById('bigEye')) //有的话就获取已有echarts实例的DOM节点。
	if (eyeballChart == null) {
		// 如果不存在，就进行初始化。
		eyeballChart = echarts.init(document.getElementById('bigEye'))
	}
	eyeballChart.setOption({
		series: [
			{
				type: 'gauge', // 使用仪表盘类型
				radius: '-20%', // 采用负数是为了让分割线从内向外延伸
				clockwise: false,
				startAngle: `${0 + leftRotSize * 5}`, // 加为逆时针旋转，乘5表示速度为leftRotSize的倍
				endAngle: `${270 + leftRotSize * 5}`, // 即变为每10微秒移动0.5度，1234678同理
				splitNumber: 3, // 分割数量，会将270度分割为3份，所以有四根线
				detail: false,
				axisLine: {
					show: false
				},
				axisTick: false,
				splitLine: {
					show: true,
					length: ballSize, // 分割线高度设置为眼球尺寸变量
					lineStyle: {
						shadowBlur: 20, // 阴影渐变
						shadowColor: ballColor, // 阴影颜色
						shadowOffsetY: '0',
						color: ballColor, // 分割线颜色
						width: 4 // 分割线宽度
					}
				},
				axisLabel: false
			},
			{
				type: 'gauge',
				radius: '-20%',
				clockwise: false,
				startAngle: `${45 + leftRotSize * 5}`,
				endAngle: `${315 + leftRotSize * 5}`,
				splitNumber: 3,
				detail: false,
				axisLine: {
					show: false
				},
				axisTick: false,
				splitLine: {
					show: true,
					length: ballSize, // 同上
					lineStyle: {
						shadowBlur: 20,
						shadowColor: ballColor,
						shadowOffsetY: '0',
						color: ballColor,
						width: 4
					}
				},
				axisLabel: false
			}
		]
	})
}

// 休眠
const toSleep = () => {
	isSleep = true
	clearInterval(rotTimer) // 清除定时器
	rotTimer = setInterval(() => {
		getEyeballChart()
		if (ballSize > 0) {
			ballSize -= 0.1 // 当眼球存在时慢慢减小
		} else {
			bigEye.className = 'eyeSocket eyeSocketSleeping' // 眼球消失后添加呼吸
		}
		leftRotSize === 360 ? (leftRotSize = 0) : (leftRotSize += 0.1) // 旋转，
	}, 10)
	document.body.removeEventListener('mousemove', focusOnMouse)
	// bigEye.style.transform = `rotateY(0deg) rotateX(0deg)`
	// eyeball.style.transform = `translate(0px, 0px)`
}

// 唤醒
const clickToWeakup = () => {
	isSleep = false // 修改状态
	eyeFilter.style.opacity = '1' // 不透明度设为1
	eyeFilter.className = bigEye.className = 'eyeSocket eyeSocketLooking' // 同时给大眼和光环添加环视动画，清除休眠状态
	setAngry() // 设置为生气模式
	clearInterval(rotTimer) // 清除定时器
	rotTimer = setInterval(() => {
		getEyeballChart()
		ballSize <= 24 && (ballSize += 0.8)
		leftRotSize === 360 ? (leftRotSize = 0) : (leftRotSize += 0.5)
	}, 10)
}

// 生气模式
const setAngry = () => {
	// 通过js修改box-card的css变量
	document.getElementById('box-card').style.setProperty('--c-eyeSocket', 'rgb(255,187,255)')
	document.getElementById('box-card').style.setProperty('--c-eyeSocket-outer', 'rgb(238,85,135)')
	document
		.getElementById('box-card')
		.style.setProperty('--c-eyeSocket-outer-shadow', 'rgb(255, 60, 86)')
	document.getElementById('box-card').style.setProperty('--c-eyeSocket-inner', 'rgb(208,14,74)')
	ballColor = 'rgb(208,14,74)'
}
// 常态模式
const setNormal = () => {
	document.getElementById('box-card').style.setProperty('--c-eyeSocket', 'rgb(41, 104, 217)')
	document.getElementById('box-card').style.setProperty('--c-eyeSocket-outer', '#02ffff')
	document.getElementById('box-card').style.setProperty('--c-eyeSocket-outer-shadow', 'transparent')
	document.getElementById('box-card').style.setProperty('--c-eyeSocket-inner', 'rgb(35, 22, 140)')
	ballColor = 'rgb(0,238,255)'
}

// 工作
function focusOnMouse(e) {
	// 视口尺寸，获取到整个视口的大小
	let clientWidth = document.body.clientWidth
	let clientHeight = document.body.clientHeight
	// 原点，即bigEye中心位置，页面中心
	let origin = [clientWidth / 2, clientHeight / 2]
	// 鼠标坐标
	let mouseCoords = [e.clientX - origin[0], origin[1] - e.clientY]
	// 旋转角度
	let eyeXDeg = (mouseCoords[1] / clientHeight) * 80 // 这里的80代表的是最上下边缘大眼X轴旋转角度
	let eyeYDeg = (mouseCoords[0] / clientWidth) * 60
	bigEye.style.transform = `rotateY(${eyeYDeg}deg) rotateX(${eyeXDeg}deg)`
	eyeball.style.transform = `translate(${eyeYDeg / 1.5}px, ${-eyeXDeg / 1.5}px)`
	// 设置休眠
	if (sleepTimer) clearTimeout(sleepTimer); // 如果休眠定时器已经被设置，则清除休眠定时器
	sleepTimer = setTimeout(() => { // 重新计时
	    toSleep();
	}, 30000);
}

const initState = () => {
	// 添加点击事件，当处于休眠状态时执行唤醒方法
	bigEye.addEventListener('click', () => {
		if (!isSleep) return
		clickToWeakup()
	})
	bigEye.addEventListener('webkitAnimationEnd', () => {
		// 监听动画结束事件
		new Promise((resolve, reject) => {
			clearInterval(rotTimer) // 清除定时器
			rotTimer = setInterval(() => {
				getEyeballChart() // 更新视图
				ballSize > 0 && (ballSize -= 0.5) // 眼球尺寸减小
				leftRotSize === 360 ? (leftRotSize = 0) : (leftRotSize += 0.1)
				if (ballSize === 0) {
					// 当眼球尺寸为0时，将Promise标记为resolved，然后执行后面的代码
					clearInterval(rotTimer)
					// resolve('成功')
				}
			}, 10)
			resolve('成功')
		}).then((data) => {
			console.log('then', data)
			eyeFilter.style.opacity = '0' // 清除光环
			eyeFilter.className = bigEye.className = 'eyeSocket' // 清除环视动画
			setNormal() // 设置常态样式
			document.body.addEventListener('mousemove', focusOnMouse)
			rotTimer = setInterval(() => {
				getEyeballChart()
				ballSize <= 24 && (ballSize += 0.5)
				leftRotSize === 360 ? (leftRotSize = 0) : (leftRotSize += 0.1)
			}, 10)
		})
	})
}

toSleep()

onMounted(() => {
	bigEye = document.getElementById('bigEye') // 获取元素
	eyeFilter = document.getElementById('eyeFilter') // 获取元素
	eyeball = document.getElementById('eyeball')
	getEyeballChart()
	initState()
})
</script>

<style lang="scss" scoped>
#box-card {
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	perspective: 1000px;
	background-color: #111;
	--c-eyeSocket: rgb(41, 104, 217);
	--c-eyeSocket-outer: #02ffff;
	--c-eyeSocket-outer-shadow: transparent;
	--c-eyeSocket-inner: rgb(35, 22, 140);
}

.eyeSocket {
	position: absolute; // 浮动居中
	left: calc(50% - 75px);
	top: calc(50% - 75px);
	width: 150px; // 固定宽度
	aspect-ratio: 1; // 长宽比 1:1 如果浏览器不支持该属性，换成 height: 150px 也一样
	border-radius: 50%;
	z-index: 1;
	cursor: pointer;
	/* 其他属性 */
	border: 4px solid var(--c-eyeSocket);
	box-shadow: 0px 0px 50px var(--c-eyeSocket-outer-shadow); /* 当生气时添加红色外发光，常态则保持透明 */
	transition: border 0.5s ease-in-out, box-shadow 0.5s ease-in-out; /* 添加过渡效果 */
}

.eyeSocket::before,
.eyeSocket::after {
	content: '';
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%); // 居中
	border-radius: 50%;
	box-sizing: border-box; // css3盒子模型
	/* 其他属性 */
	transition: all 0.5s ease-in-out; /* 添加过渡效果 */
}
.eyeSocket::before {
	width: calc(100% + 20px);
	height: calc(100% + 20px);
	border: 6px solid #02ffff;
	/* 其他属性 */
	border: 6px solid var(--c-eyeSocket-outer);
}
.eyeSocket::after {
	width: 100%;
	height: 100%;
	box-shadow: inset 0px 0px 30px rgb(35, 22, 140);
	/* 其他属性 */
	border: 4px solid var(--c-eyeSocket-inner);
	box-shadow: inset 0px 0px 30px var(--c-eyeSocket-inner);
}
#eyeball {
	width: 100%;
	height: 100%;
}

.filter {
	width: 100%;
	height: 100%;
	filter: url('#filter'); /* 开启滤镜 */
}
.eyeSocket,
.filter .eyeSocket {
	/* 给替身加上相同的样式 */
	/* ...原属性 */
	position: absolute;
	left: calc(50% - 75px);
	top: calc(50% - 75px);
	width: 150px;
	aspect-ratio: 1;
	border-radius: 50%;
	border: 4px solid var(--c-eyeSocket);
	box-shadow: 0px 0px 50px var(--c-eyeSocket-outer-shadow);
	transition: border 0.5s ease-in-out, box-shadow 0.5s ease-in-out;
	z-index: 1;
}
.filter .eyeSocket {
	/* ...其它属性 */
	opacity: 0; // 默认状态下不透明度为0
	left: calc(50% - 92px);
	top: calc(50% - 92px);
	transition: all 0.5s ease-in-out; // 添加过渡效果，值得注意的是不能丢了原本的过渡效果，所以这里使用all
}

/* ...其他样式 */
.eyeSocketSleeping {
	animation: sleeping 6s infinite;
}

@keyframes sleeping {
	0% {
		transform: scale(1);
	}

	50% {
		transform: scale(1.2);
	}

	100% {
		transform: scale(1);
	}
}

.eyeSocketLooking {
	animation: lookAround 2.5s; // 添加动画，只播放一次
}

/* 环视动画 */
@keyframes lookAround {
	0% {
		transform: translateX(0) rotateY(0);
	}

	10% {
		transform: translateX(0) rotateY(0);
	}

	40% {
		transform: translateX(-70px) rotateY(-30deg);
	}

	80% {
		transform: translateX(70px) rotateY(30deg);
	}

	100% {
		transform: translateX(0) rotateY(0);
	}
}
</style>
