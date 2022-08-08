<template>
	<el-card>
		<div class="user-profile">
			<div class="box-center">
				<el-image :src="parentInfo.img" class="box-center-img"></el-image>
			</div>
			<div class="box-center">
				<div class="user-name text-center">{{ parentInfo.name }}</div>
			</div>
		</div>

		<div class="user-bio">
			<div class="user-education user-bio-section">
				<div class="user-bio-section-header">
					<svg-icon icon-class="education" /><span>角色</span>
				</div>
				<div class="user-bio-section-body">
					<div class="text-muted">{{ parentInfo.info }}</div>
				</div>
			</div>

			<div class="user-skills user-bio-section">
				<div class="user-bio-section-header"><svg-icon icon-class="skill" /><span>技能</span></div>
				<div class="user-bio-section-body">
					<div class="progress-item">
						<span>境界</span>
						<el-progress :percentage="parentInfo.level">
							<span>{{ parentInfo.level }}</span>
						</el-progress>
					</div>
					<div class="progress-item">
						<span>战力</span>
						<el-progress :percentage="18" />
					</div>
					<div class="progress-item">
						<span>稀有度</span>
						<el-progress :percentage="100" status="success" />
					</div>
				</div>
			</div>
		</div>
	</el-card>
</template>

<script lang="ts" setup>
import { defineEmits } from 'vue'
// name: 'UserCard',
// 接受父组件传递的props
const props = defineProps({
	parentInfo: {
		type: Object,
		default: () => {
			return {
				name: '',
				sectName: '',
				address: ''
			}
		}
	},
	msg: { type: String, default: '' }
})

// console.log('props.parentInfo', props.parentInfo) //父组件信息
</script>

<style lang="scss" scoped>
.box-center {
	margin: 0 auto;
	display: table;
	.box-center-img {
		width: 50%;
		margin: 0 25%;
	}
}

.text-muted {
	color: #777;
}

.user-profile {
	.user-name {
		font-weight: bold;
	}

	.box-center {
		padding-top: 10px;
	}
}

.user-bio {
	margin-top: 20px;
	color: #606266;

	span {
		padding-left: 4px;
	}

	.user-bio-section {
		font-size: 14px;
		padding: 15px 0;

		.user-bio-section-header {
			border-bottom: 1px solid #dfe6ec;
			padding-bottom: 10px;
			margin-bottom: 10px;
			font-weight: bold;
		}
	}
}
</style>
