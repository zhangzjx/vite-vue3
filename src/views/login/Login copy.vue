<template>
	<div class="login">
		<div class="loginForm">
			<div class="login_tit">
				<h4>
					<img src="@/assets/logo.png" alt="" />
				</h4>
			</div>

			<label :class="{ active: inputType == 1 }">
				<input type="text" placeholder="请输入账号" @focus="inputType = 1" />
			</label>

			<label :class="{ active: inputType == 2 }">
				<input type="text" placeholder="请输入密码" @focus="inputType = 2" @blur="inputType = 0" />
			</label>
		</div>

		<button class="loginBtn" @click="loginFun">登录</button>
		<!-- <el-button type="primary">登录</el-button> -->
	</div>
</template>
<script lang="ts">
import router from '@/router'
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { login } from '@/api/login'

export default defineComponent({
	setup() {
		const inputType = ref(0)
		const form = ref({ username: 'admin', password: 123456 })
		const rules = ref({
			username: {
				required: true,
				message: '请输入账号',
				trigger: 'blur'
			},
			password: {
				required: true,
				message: '请输入密码',
				trigger: 'blur'
			}
		})

		const loginFun = () => {
			console.log('login............', form.value)
			const id = 1

			// login(form.value)

			router.push({
				name: 'users',
				params: {
					type: 'detail',
					id: id
				}
			})
		}
		return {
			inputType,
			form,
			loginFun
		}
	}
})
</script>
<style lang="scss" scoped>
.login_tit {
	line-height: 1.7;

	h4 {
		text-align: center;
		font-size: 20px;
		color: #8bc34a;
		font-weight: 500;

		img {
			height: 105px;
			display: block;
			margin: 50px auto;
			margin-bottom: 0;
		}
	}
}

.loginForm {
	display: block;

	label {
		margin: 0 auto;
		display: table;
		width: 90%;
		margin-bottom: 50px;
		border: 1px solid #fff;
		transition: all 0.8s;
		border-radius: 300px;

		&.active {
			border: 1px solid #000;
		}

		input {
			border: 0;
			-webkit-box-shadow: 0 0 15px #ccc;
			box-shadow: 0 0 15px #0000000f;
			padding: 15px 0;
			width: 100%;
			float: left;
			text-indent: 20px;
			border-radius: 50px;
			outline: none;
		}
	}
}

.loginBtn {
	padding: 14px 0;
	border: 0;
	background: #000;
	color: #fff;
	border-radius: 50px;
	width: 92%;
	margin: auto;
	display: block;
	outline: none;
}
</style>
