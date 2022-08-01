<template>
	<Layer :layer="layer" @confirm="submit" @close="cancel" ref="layerDom">
		<BaseForm
			v-model="layer.row"
			ref="refForm"
			:config="layer.config"
			:rules="layer.rules"
			@onSubmit="finalSubmit"
		/>
	</Layer>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import { add, update } from '@/api/table'
import Layer from '@/components/layer/Layer.vue'
import BaseForm from '@/components/base/BaseForm.vue'

export default defineComponent({
	components: {
		Layer,
		BaseForm
	},
	props: {
		// 父组件定义
		// const layer = reactive({
		// 	layerVisible: false,
		// 	layerTitle: '新增',
		// 	showButton: true,
		// 	drag: true,
		// 	row: {},
		// 	config: [
		// 		{
		// 			tag: 'input',
		// 			field: 'name',
		// 			placeholder: '姓名',
		// 			label: '姓名'
		// 		},
		// 		{
		// 			tag: 'select',
		// 			field: 'sex',
		// 			placeholder: '性别',
		// 			label: '性别',
		// 			value: [],
		// 			options: [
		// 				{
		// 					value: '男',
		// 					label: '1'
		// 				},
		// 				{
		// 					value: '女',
		// 					label: '2'
		// 				}
		// 			]
		// 		}
		// 	],
		// 	rules: {
		// 		name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
		// 		redirect: [{ required: true, message: '请输入数字', trigger: 'blur' }],
		// 		path: [{ required: true, message: '请选择', trigger: 'blur' }],
		// 		icon: [{ required: true, message: '请选择', trigger: 'blur' }]
		// 	}
		// })
		layer: {
			type: Object,
			default: () => {
				return {}
			}
		}
	},
	setup(props, ctx) {
		const visible = ref(false)
		const refForm = ref(null)
		const layerDom = ref(null)
		let form = ref({
			name: '',
			children: [],
			meta: { icon: 'DataAnalysis', title: 'message.menu.control.name' },
			path: '/control',
			redirect: '/dashboard',
			remark: '',
			weight: '',
			radio: '1'
		})

		const init = () => {
			// 用于判断新增还是编辑功能
			if (props.layer.row) {
				form.value = JSON.parse(JSON.stringify(props.layer.row)) // 数量量少的直接使用这个转
			} else {
			}
		}
		const cancel = () => {
			ctx.emit('close', true)
		}

		const submit = () => {
			// 调用子组件提交表单方法
			refForm.value.onSubmit()
		}

		// 表单校验通过后提交表单
		const finalSubmit = (formData) => {
			// console.log('refForm!', refForm)
			// console.log('refForm.value!', refForm.value)
			console.log('finalSubmit!', formData)
			let params = formData
			if (props.layer.row) {
				updateForm(params)
			} else {
				addForm(params)
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
			layerDom,
			refForm,
			visible,
			cancel,
			submit,
			finalSubmit,
			addForm,
			updateForm
		}
	}
})
</script>

<style lang="scss" scoped></style>
