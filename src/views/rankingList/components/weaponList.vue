<template>
	<div id="sectList">
		<el-row :gutter="20">
			<el-col :span="12">
				<el-card class="box-card">
					<template #header>
						<div class="card-header">排行榜</div>
					</template>
					<!-- 表格 -->
					<el-table :data="myDableData" style="width: 100%">
						<el-table-column label="排名" width="180">
							<template v-slot="{ row }">
								<span>{{ row.id }}</span>
							</template>
						</el-table-column>
						<el-table-column label="姓名" width="180">
							<template v-slot="{ row }">
								<el-link type="primary" @click="weaponInfo(row.id)">{{ row.weaponName }}</el-link>
							</template>
						</el-table-column>
						<el-table-column label="所属势力">
							<template v-slot="{ row }">
								<span>{{ row.weaponMaster }}</span>
							</template>
						</el-table-column>
					</el-table>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card class="box-card">
					<template #header>
						<div class="card-header">兵器信息</div>
					</template>
					<div class="block">
						<!-- <img :src="imgUrl"/> -->
						<el-image :src="imgUrl" class="weapon_img"
							><template #placeholder>
								<div class="image-slot">加载中<span class="dot">...</span></div>
							</template>
						</el-image>
					</div>
				</el-card></el-col
			>
		</el-row>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import weapon1 from '@/assets/weapon-1.jpg'
import weapon2 from '@/assets/weapon-2.jpg'
import weapon4 from '@/assets/weapon-4.png'

export default defineComponent({
	name: 'WeaponList',
	setup(props, ctx) {
		console.log('ctx', ctx)
		const weapon = reactive([weapon1, weapon2, , weapon4])
		let imgUrl = ref(weapon[0])
		let myDableData = reactive([
			{
				id: 1,
				weaponName: '天机棒',
				weaponMaster: '「天机老人」孙老头',
				sectLevel: '1',
				createTime: '2022-05-01'
			},
			{
				id: 2,
				weaponName: '子母龙凤环',
				weaponMaster: '「龙凤环」上官金虹',
				sectLevel: '1',
				createTime: '2022-05-02'
			},
			{
				id: 3,
				weaponName: '小李飞刀',
				weaponMaster: '「小李探花」李寻欢',
				sectLevel: '1',
				createTime: '2022-05-03'
			},
			{
				id: 4,
				weaponName: '嵩阳铁剑',
				weaponMaster: '「铁剑」郭嵩阳',
				sectLevel: '1',
				createTime: '2022-05-04'
			},
			{
				id: 5,
				weaponName: '温侯银戟',
				weaponMaster: '「银戟温侯」吕凤先',
				sectLevel: '1',
				createTime: '2022-05-05'
			}
		])
		const weaponInfo = (id) => {
			imgUrl.value = weapon[id - 1]
		}
		return {
			weapon,
			weaponInfo,
			imgUrl,
			myDableData
			// src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
			// src: require("../../../assets/weapon-1.jpg"),
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
.el-table .cell {
	text-align: center;
}
.block {
	text-align: center;
}
.weapon_img {
	width: 200px;
}
</style>
