<!--
 * @Description: 页脚
-->
<template>
	<section class="footer">{{ nowYear }} © TEP &nbsp;●&nbsp; 版权所有</section>
</template>

<script lang="ts" setup>
const date = new Date()
const nowYear = date.getFullYear() //获取完整的年份(4位)
</script>

<style scoped lang="scss">
.footer {
	width: 100%;
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 13px;
	color: #7f8c8d;
}
</style>
