<template>
	<ScreenAdapter>
		<div class="login-container">
			<el-card class="box-card">
				<div class="login-form flex">
					<el-form ref="formRef" :model="form" :rules="rules">
						<div class="title-container">
							<h3 class="title">{{ $t('message.system.title') }}</h3>
						</div>
						<el-form-item prop="username">
							<svg-icon name="user" class="svg-container"></svg-icon>
							<el-input v-model="form.username"></el-input>
						</el-form-item>
						<el-form-item prop="password">
							<svg-icon name="password" class="svg-container"></svg-icon>
							<el-input v-model="form.password" :type="passwordType"></el-input>
							<svg-icon class="show-pwd"
								:name="passwordType === 'password' ? 'eye' : 'eye-open'"
								@click="changeType"
							></svg-icon>
						</el-form-item>
						<el-button type="primary" class="login-button" @click="handleLogin">{{
							$t('message.system.login')
						}}</el-button>
					</el-form>
				</div>
				<div class="login-info">
					<div class="info-card blur_box">
						<h2>{{ $t('message.system.subTitle') }}</h2>
					</div>
				</div>
			</el-card>
		</div>
	</ScreenAdapter>
</template>

<script setup lang="ts">
import { login } from '@/api/login'
import ScreenAdapter from '@/components/ScreenAdapter.vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const form = ref({
	username: 'admin',
	password: '123456'
})

const rules = ref({
	username: [
		{
			required: true,
			message: 'Please input Activity name',
			trigger: 'blur'
		}
	],
	password: [
		{
			required: true,
			message: 'Please input Activity name',
			trigger: 'blur'
		}
	]
})

const formRef = ref(null)
const handleLogin = () => {
	formRef.value.validate(async (valid) => {
		if (valid) {
			store.dispatch('app/login', form.value)
			// await login(form.value)
		} else {
			console.log('error submit!!')
			return false
		}
	})
}

const passwordType = ref('password')
const changeType = () => {
	if (passwordType.value === 'password') {
		passwordType.value = 'text'
	} else {
		passwordType.value = 'password'
	}
}
</script>

<style lang="scss" scoped>
$bg: #e4e7ec;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #121b74;

.login-container {
	height: 100%;
	width: 100%;
	background-color: $bg;
	// overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;

	.box-card {
		width: 70%;
		height: 80%;
		display: flex;
		color: $black;
		background-color: $white;
	}
	:deep(.el-card) {
		border-radius: 10px;
		--el-card-padding: 0px;

		.el-card__body {
			width: 100%;
		}
	}

	.flex {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.login-form {
		float: left;
		width: 50%;
		height: 100%;

		:deep(.el-form-item) {
			border: 1px solid rgba(255, 255, 255, 0.1);
			background: rgba(0, 0, 0, 0.1);
			border-radius: 5px;
			color: #454545;
		}
		:deep(.el-input) {
			display: inline-block;
			height: 47px;
			width: 300px;

			input {
				background: transparent;
				border: 0px;
				-webkit-appearance: none;
				border-radius: 0px;
				padding: 12px 5px 12px 15px;
				color: $black;
				height: 47px;
				caret-color: $cursor;
			}
		}
		.login-button {
			width: 100%;
			box-sizing: border-box;
		}
	}

	.login-info {
		float: left;
		width: 50%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		background: url('@/assets/login-info.jpg') no-repeat;
		filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')";
		-moz-background-size: 100% 100%;
		background-size: 100% 100%;

		.info-card {
			width: 90%;
			height: 80px;
			margin-bottom: 30px;
			color: $white;
		}
		.blur_box {
			backdrop-filter: blur(5px) brightness(110%); // 磨砂效果
		}
	}

	.svg-container {
		padding: 6px 5px 6px 15px;
		color: $black;
		vertical-align: middle;
		display: inline-block;
	}

	.title-container {
		position: relative;

		.title {
			font-size: 26px;
			color: $black;
			margin: 0px auto 40px;
			text-align: center;
			font-weight: bold;
		}

		:deep(.lang-select) {
			position: absolute;
			top: 4px;
			right: 0;
			background-color: $white;
			font-size: 22px;
			padding: 4px;
			border-radius: 4px;
			cursor: pointer;
		}
	}

	.show-pwd {
		margin-right: 10px;
		font-size: 16px;
		color: $dark_gray;
		cursor: pointer;
		user-select: none;
	}
}
</style>
