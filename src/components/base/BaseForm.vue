<!--
表单组件
-->
<template>
	<div class="form-wrapper">
		<div class="base-form">
			<el-form :inline="true" :model="formData" :rules="rules" ref="baseForm">
				<div v-for="(item, index) in config" :key="index" class="form-item">
					<el-row :gutter="20">
						<el-col :span="24">
							<slot v-if="item.slot" :name="item.slot" />
							<template v-else>
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
										v-model="sd"
										type="daterange"
										start-placeholder="开始日期"
										end-placeholder="结束日期"
										format="YYYY-MM-DD"
										value-format="YYYY-MM-DD HH:mm:ss"
										:default-time="defaultTime"
									/>

									<el-switch v-if="item.tag === 'switch'" v-model="formData[item.field]" />
									<el-checkbox-group v-if="item.tag === 'checkbox'" v-model="formData[item.field]">
										<el-checkbox label="Online activities" name="type" />
										<el-checkbox label="Promotion activities" name="type" />
										<el-checkbox label="Offline activities" name="type" />
									</el-checkbox-group>
								</el-form-item>
							</template>
						</el-col>
					</el-row>
				</div>
			</el-form>
		</div>
	</div>
</template>

<script lang="ts">
import { nextTick, Prop, ref, reactive } from 'vue'
import { defineComponent, computed } from 'vue'

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
		rules: [],
		hidden: {
			type: Boolean,
			default: false
		}
	},

	// setup(props, context) {
	setup(props, { attrs, slots, emit }) {
		const baseForm = ref()
		const loading = false
		const defaultTime = ref([new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)])
		let formData = reactive({})

		const onSubmit = () => {
			if (baseForm) {
				baseForm.value.validate((valid) => {
					if (valid) {
						console.log('submit!')
						emit('onSubmit', formData)
					} else {
						console.log('error submit!')
						return false
					}
				})
			}
		}

		return {
			loading,
			defaultTime,
			baseForm,
			formData,
			onSubmit
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
	.base-form {
		width: 100%;
		.form-item {
			padding: 4px;
		}
	}
}
:deep .el-form-item {
	width: 100%;
}
</style>
