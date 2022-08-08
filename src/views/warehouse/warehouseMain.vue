<template>
	<el-tabs v-model="activeName" @tab-click="handleClick">
		<el-tab-pane label="神兵榜" name="first"><weaponList /></el-tab-pane>
		<el-tab-pane label="战力榜" name="second"><personList /></el-tab-pane>
	</el-tabs>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import Search from '@/components/base/SearchBar.vue'
import WeaponList from '../rankingList/components/weaponList.vue'
import PersonList from '../rankingList/components/personList.vue'

export default defineComponent({
	name: 'otherTable',
	components: {
		WeaponList,
		PersonList
	},
	setup() {
		const activeName = ref('first')
		const handleClick = (tab, event) => {
			console.log(tab, event)
		}
		return {
			activeName,
			handleClick
		}
	}
})
</script>

<style lang="scss" scoped></style>
