<template>
	<div class="login-container">
		<el-form ref="formRef" :model="form" class="login-form" :rules="rules">
			<el-card class="box-card">
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
					<svg-icon
						:name="passwordType === 'password' ? 'eye' : 'eye-open'"
						@click="changeType"
					></svg-icon>
				</el-form-item>
				<el-button type="primary" class="login-button" @click="handleLogin">{{
					$t('message.system.login')
				}}</el-button>
			</el-card>
		</el-form>
	</div>
</template>

<script setup lang="ts">
import { login } from '@/api/login'
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
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #121b74;

.login-container {
	min-height: 100%;
	width: 100%;
	background-color: $bg;
    background-image: url("@/assets/login-bg.png");
    opacity: 0.8;
	overflow: hidden;

	.box-card {
        color: $black;
		background-color: #dadada;
	}

	.login-form {
		position: relative;
		width: 520px;
		max-width: 100%;
		padding: 160px 35px 0;
		margin: 0 auto;
		overflow: hidden;

		:deep(.el-form-item) {
			border: 1px solid rgba(255, 255, 255, 0.1);
			background: rgba(0, 0, 0, 0.1);
			border-radius: 5px;
			color: #454545;
		}
		:deep(.el-input) {
			display: inline-block;
			height: 47px;
			width: 85%;

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
			margin: 0px auto 40px auto;
			text-align: center;
			font-weight: bold;
		}

		:deep(.lang-select) {
			position: absolute;
			top: 4px;
			right: 0;
			background-color: white;
			font-size: 22px;
			padding: 4px;
			border-radius: 4px;
			cursor: pointer;
		}
	}

	.show-pwd {
		// position: absolute;
		// right: 10px;
		// top: 7px;
		font-size: 16px;
		color: $dark_gray;
		cursor: pointer;
		user-select: none;
	}
}
</style>
