<template>
	<Layer :layer="layer" @confirm="submit" @close="cancel" ref="layerDom">
		<el-form
			:model="form"
			:rules="rules"
			ref="refForm"
			label-width="120px"
			style="margin-right: 30px"
		>
			<el-form-item label="名称：" prop="name">
				<el-input v-model="form.name" placeholder="请输入名称"></el-input>
			</el-form-item>
			<el-form-item label="数字：" prop="number">
				<el-input
					v-model="form.number"
					oninput="value=value.replace(/[^\d]/g,'')"
					placeholder="只能输入正整数"
				></el-input>
			</el-form-item>
			<el-form-item label="选择器：" prop="choose">
				<el-select v-model="form.choose" placeholder="请选择" clearable>
					<el-option
						v-for="item in selectData"
						:key="item.value"
						:label="item.label"
						:value="item.value"
					></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="单选框：" prop="radio">
				<el-radio-group v-model="form.radio">
					<el-radio v-for="item in radioData" :key="item.value" :label="item.value">{{
						item.label
					}}</el-radio>
				</el-radio-group>
			</el-form-item>
		</el-form>
	</Layer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { add, update } from '@/api/table'
import { selectData, radioData } from './enum'
import Layer from '@/components/layer/Layer.vue'
export default defineComponent({
	components: {
		Layer
	},
	props: {
		layer: {
			type: Object,
			default: () => {
				return {}
			}
		}
	},
	setup(props, ctx) {
		const refForm = ref(null)
		const layerDom = ref(null)
		let form = ref({
			name: '',
			number: '',
			choose: '',
			radio: ''
		})
		const rules = {
			name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
			number: [{ required: true, message: '请输入数字', trigger: 'blur' }],
			choose: [{ required: true, message: '请选择', trigger: 'blur' }],
			radio: [{ required: true, message: '请选择', trigger: 'blur' }]
		}

		const init = () => {
			// 用于判断新增还是编辑功能
			if (props.layer.row) {
				form.value = JSON.parse(JSON.stringify(props.layer.row)) // 数量量少的直接使用这个转
			} else {
			}
		}
		const cancel = () => {
			props.layer.layerVisible = false
		}

		const submit = () => {
			// console.log('refForm!', refForm)
			// console.log('refForm.value!', refForm.value)
			if (refForm) {
				refForm.value.validate((valid) => {
					if (valid) {
						console.log('submit!')
						let params = form
						if (props.layer.row) {
							updateForm(params)
						} else {
							addForm(params)
						}
					} else {
						console.log('error submit!')
						return false
					}
				})
			}
		}
		// 新增提交事件
		const addForm = (params: object) => {
			console.log('addForm!', props.layer.row)
			add(params).then((res) => {
				if (res) {
					ElMessage({
						message: '新增成功',
						type: 'success'
					})
					ctx.emit('getTableData', true)
				}
				layerDom && layerDom.close()
			})
		}
		// 编辑提交事件
		const updateForm = (params: object) => {
			console.log('updateForm!', props.layer.row)
			update(params).then((res) => {
				if (res) {
					ElMessage({
						message: '编辑成功',
						type: 'success'
					})
					ctx.emit('getTableData', false)
				}
				layerDom && layerDom.close()
			})
		}
		init()
		return {
			form,
			rules,
			layerDom,
			refForm,
			selectData,
			radioData,
			cancel,
			submit,
			addForm,
			updateForm
		}
	}
})
</script>

<style lang="scss" scoped></style>
