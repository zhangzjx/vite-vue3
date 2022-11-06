<template>
	<!-- <basic-template /> -->
	<!-- <Card />
    <Charts /> -->

	<!-- <el-skeleton animated /> -->
	<div>
		<el-card class="box-card" style="background: rgb(225, 234, 249)">
			<div class="outer">
				<div class="outer-left">
					<el-image :src="headerLeft" class="outer-left-img" />
				</div>
				<div class="outer-right">
					<h3 style="color: aqua; margin-top: 0">泰戈尔</h3>
					<P>{{ txtCh }}</P>
					<P>{{ txtEn }}</P>
				</div>
			</div>
		</el-card>
		<div class="box">
			<el-row :gutter="20">
				<el-col :span="6" v-for="(item, index) in initData" :key="index">
					<el-card shadow="hover" class="box-bg">
						<div class="box-head" :title="item.title">{{ item.title }}</div>
						<div class="box-content flex">
							<div class="box-content-left flex">{{ item.left }}</div>
							<div class="box-content-right flex">{{ item.right }}</div>
						</div>
					</el-card>
				</el-col>
			</el-row>
		</div>
		<!-- 图表 -->
		<Charts />
		<!-- 其它 -->
		<div style="margin-top: 5%">
			<el-button type="primary" @click="goEye">eye</el-button>
			<el-button type="primary" @click="goDemo">demo</el-button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { defineComponent, ref, reactive, nextTick, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import basicTemplate from './components/basic-template.vue'
// import Card from './components/card/index.vue'
import headerLeft from '@/assets/header-left.svg'
import Charts from './components/index.vue'
const route = useRoute()
const router = useRouter()

const txtCh = ref(
	'I sit at my window this morning where the world like a passer-by stops for a moment, nods to me and goes.'
)
const txtEn = ref('我今晨坐在窗前,世界如一个路人似的,停留了一会,向我点点头又走过去了。 ——泰戈尔')
const initData = reactive([
	{ title: '休对故人思故国，且将新火试新茶', left: '苏轼', right: '《望江南·超然台作》' },
	{ title: '与君初相识，犹如故人归', left: '杜牧', right: '《会友》' },
	{
		title: '青、出于蓝而胜于蓝。冰，水为之而寒于水',
		left: '苟子',
		right: '《苟子·劝学》'
	},
	{ title: '剑阁峥嵘而崔嵬，一夫当关，万夫莫开', left: '李白', right: '《蜀道难》' }
])

const goEye = () => {
	const href = 'www.baidu.com'
	const params = { id: 1 }
	let routeData = router.resolve({
		name: 'eye',
		query: params,
		params: { catId: params.id }
	})
	window.open(routeData.href, '_brank')
}
const goDemo = () => {
	const params = { id: 1 }
	let routeData = router.resolve({
		name: 'demo',
		query: params,
		params: { catId: params.id }
	})
	window.open(routeData.href, '_brank')
}
</script>

<style lang="scss" scoped>
.outer {
	display: flex;
	height: 100px;
}
.outer-left {
	width: 200px;
	// background: tomato;
	.outer-left-img {
		width: 200px;
		height: 100px;
	}
}
.outer-right {
	flex: 1;
	text-align: left;
	// background: gold;
}

.box {
	margin: 20px 0;
	.grid-content {
		border-radius: 4px;
		min-height: 36px;
		background: gold;
	}
	.box-bg {
		background: #f5f7fa;
	}
	.box-head {
		overflow: hidden; //超出隐藏
		white-space: nowrap; //设置文字不换行
		text-overflow: ellipsis; //超出显示...
	}
	.box-content {
		margin-top: 10px;

		.box-content-left {
			width: 30%;
		}

		.box-content-right {
			width: 70%;
			justify-content: flex-end;
		}
	}
}

.flex {
	display: flex;
}
</style>
