<!--
搜索组件
-->
<template>
	<div class="form-wrapper">
		<div class="search-form">
			<el-form :inline="true" :model="formData">
				<div v-for="(item, index) in config" :key="index" class="form-item">
					<!-- <el-form-item :label="item.label" :prop="field">
						<el-input v-model="formData[item.field]" :placeholder="item.placeholder" />
					</el-form-item> -->
					<el-form-item :label="item.label" :prop="item.field">
						<el-input
							v-if="item.tag === 'input'"
							v-model="formData[item.field]"
							:placeholder="item.placeholder"
						></el-input>
						<el-select
							v-if="item.tag === 'select'"
							v-model="formData[item.field]"
							:placeholder="item.placeholder"
						>
							<el-option
								v-for="opItem in item.options"
								:key="opItem.value"
								:label="opItem.label"
								:value="opItem.value"
							/>
						</el-select>
						<el-date-picker
							v-if="item.tag === 'date-picker'"
							v-model="formData[item.field]"
							type="daterange"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							format="YYYY-MM-DD"
							value-format="YYYY-MM-DD HH:mm:ss"
							:default-time="defaultTime"
						/>
					</el-form-item>
				</div>
				<div class="form-item">
					<el-button type="primary" @click="onQuery" :icon="Search">查询</el-button>
					<el-button
						:loading="loading"
						type="primary"
						class="m-l-4"
						@click="onReset"
						:icon="Refresh"
						>重置</el-button
					>
					<el-button
						v-if="formBtn.includes('exerpot')"
						:loading="loading"
						type="primary"
						class="m-l-4"
						@click="onExerpot"
						>导出</el-button
					>
					<el-button
						v-if="formBtn.includes('insert')"
						:loading="loading"
						type="primary"
						class="m-l-4"
						@click="onInsert"
						>添加</el-button
					>
					<!-- <el-button
						v-if="config.length > 10"
						class="collapse-btn m-l-4"
						size="small"
						type="link"
						:icon="collapsed ? 'up' : 'down'"
						@click="collapsed = !collapsed"
						>{{ collapsed ? '收起' : '更多' }}</el-button
					> -->
				</div>
				<!-- <div v-for="item in searchItems" :key="item.field">
					<el-form-item label="Activity zone">
						<el-select v-model="formData.region" placeholder="Activity zone">
							<el-option label="Zone one" value="shanghai" />
							<el-option label="Zone two" value="beijing" />
						</el-select>
					</el-form-item>
				</div> -->
			</el-form>
		</div>
	</div>
</template>

<script lang="ts">
import { nextTick, Prop, ref, reactive } from 'vue'
import { defineComponent, computed } from 'vue'
import { Delete, Edit, Search, Refresh, Upload } from '@element-plus/icons-vue'

interface Props {
	formBtn: Array<any>
	hidden: boolean
}
export default defineComponent({
	name: 'Pagination',
	props: {
		/**
		 * @desc form config 控件配置
		 * @type Array [{ tag, field, label, placeholder, ... }, ...]
		 * @tag form表单组件名称 *required
		 * @field formData属性名 *required
		 * @value 希望设置控件初始值时可使用
		 * @label form表单组件label名
		 * @other 其他更多组件属性
		 */
		config: [],
		formBtn: {
			type: Array,
			default: () => ['query', 'reset']
		},
		hidden: {
			type: Boolean,
			default: false
		}
	},

	// setup(props, context) {
	setup(props, { attrs, slots, emit }) {
		const loading = false
		const defaultTime = ref([new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)])
		let formData = reactive({})

		const onQuery = () => {
			emit('query', formData)
		}

		//重置查询参数
		const onReset = () => {
			//重置查询参数
			// console.log(props)
			setInitFormData()
			console.log('重置查询参数', props)
			emit('reset')
		}

		const onInsert = () => {
			console.log('新增!')
			emit('insert')
		}

		const onExerpot = () => {
			console.log('导出!')
			emit('exerpot')
		}

		//构造formData初始值(防止出现reset后undefined、以及需要默认值时)
		//至于为什么需要创建新的{} 了解: observe实现原理  https://segmentfault.com/q/1010000018510815
		const setInitFormData = () => {
			// 初始化父组件的数据
			// console.log('formData', formData)
			const config = props.config
			Object.assign(formData, ...config.map((v) => ({ [v.field]: 'value' in v ? v.value : '' })))
		}

		return {
			loading,
			defaultTime,
			formData,
			onQuery,
			onReset,
			onInsert,
			onExerpot,
			setInitFormData,
			Delete,
			Edit,
			Search,
			Refresh,
			Upload
		}
	}
})
</script>

<style scoped lang="scss">
.form-wrapper {
	width: 100%;
	// overflow-x: auto;
	background: #fff;
	display: flex;
	margin: 8px;
	.search-form {
		width: auto;
		.form-item {
			float: left;
			display: flex;
			align-items: center;
			padding: 4px;
		}
	}
}
</style>
