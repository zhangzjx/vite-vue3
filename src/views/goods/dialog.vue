<template>
	<Layer :layer="layer" @confirm="submit" @close="cancel" ref="layerDom">
		<el-form
			:model="form"
			:rules="rules"
			ref="refForm"
			label-width="120px"
			style="margin-right: 30px"
		>
			<el-form-item label="上级菜单规则" prop="name">
				<el-input v-model="form.name" placeholder="请输入名称"></el-input>
			</el-form-item>
			<el-form-item label="规则类型" prop="radio">
				<el-radio-group v-model="form.radio">
					<el-radio label="1" size="large" border>菜单目录</el-radio>
					<el-radio label="2" size="large" border>菜单项</el-radio>
					<el-radio label="3" size="large" border>页面按钮</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="规则名称" prop="name">
				<el-input v-model="form.name" placeholder="请输入名称"></el-input>
			</el-form-item>
			<el-form-item label="规则图标" prop="number">
				<el-input
					v-model="form.meta.icon"
					ref="inputRef"
					placeholder="搜索图标"
					@click="onClickOutside"
				>
					<template #prepend>
						<el-icon><component :is="form.meta.icon" /></el-icon>
						<span style="margin-left: 5px">{{ form.meta.icon }}</span>
					</template>
					<template #append>
						<el-button :icon="Refresh" @click="refreshIcon" />
					</template>
				</el-input>
			</el-form-item>
			<el-form-item label="备注" prop="remark">
				<el-input v-model="form.remark" placeholder="请输入名称"></el-input>
			</el-form-item>
			<el-form-item label="权重" prop="weight">
				<el-input v-model="form.weight" placeholder="排序依据"></el-input>
			</el-form-item>
		</el-form>
		<el-popover
			ref="popoverRef"
			:virtual-ref="inputRef"
			trigger="click"
			title="icon"
			:width="popWidth"
			virtual-triggering
			v-model:visible="visible"
		>
			<Selector @getIcon="getIcon" />
		</el-popover>
	</Layer>
</template>

<script lang="ts" setup>
import { ref, computed, useAttrs, useSlots, defineEmits } from 'vue'
import { ElMessage } from 'element-plus'
import { add, update } from '@/api/table'
import Selector from '@/components/SvgIcon/selector.vue'
import Layer from '@/components/layer/Layer.vue'
import { Refresh } from '@element-plus/icons-vue'

// 接受父组件传递的props
const props = defineProps({
	layer: {
		type: Object,
		default: () => {
			return {}
		}
	}
})
// 获取attrs
const attrs = useAttrs()
console.log('attrs', attrs)
// 获取 emit
const emit = defineEmits(['close', 'getTableData'])
// 获取slots
const slots = useSlots()
console.log('slots', slots)

const visible = ref(false)
const refForm = ref(null)
const layerDom = ref(null)
let form = ref({
	name: '',
	children: [],
	meta: { icon: '', title: '' },
	path: '',
	redirect: '',
	remark: '',
	weight: '',
	radio: '1'
})
const rules = {
	name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
	redirect: [{ required: true, message: '请输入数字', trigger: 'blur' }],
	path: [{ required: true, message: '请选择', trigger: 'blur' }],
	icon: [{ required: true, message: '请选择', trigger: 'blur' }]
}
const inputRef = ref(null)
const popoverRef = ref(null)
let popWidth = computed(() => {
	console.log('列表的高度是：', popoverRef.value?.offsetWidth)
	return popoverRef.value?.offsetWidth !== undefined ? popoverRef.value.offsetWidth : 450
})

// 打开图标
const onClickOutside = () => {
	visible.value = true
	// unref(popoverRef).popperRef?.delayHide?.()
}

// 选择图标
const getIcon = (event) => {
	form.value.meta.icon = event
	visible.value = false
}

// 重置图标
const refreshIcon = () => {
	form.value.meta.icon = ''
}

const init = () => {
	console.log('初始化', props.layer.row)
	// 用于判断新增还是编辑功能
	if (props.layer.row) {
		form.value = JSON.parse(JSON.stringify(props.layer.row)) // 数量量少的直接使用这个转
	} else {
	}
}
const cancel = () => {
	emit('close', true)
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
			emit('getTableData', true)
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
			emit('getTableData', false)
		}
		layerDom && layerDom.close()
	})
}
init()
</script>

<style lang="scss" scoped></style>
