<template>
	<div class="outer">
		<div class="left"></div>
		<div class="center"></div>
		<div class="right"></div>
	</div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.outer {
	display: flex;
	height: 100px;
}

.left {
	width: 100px;
	background: tomato;
}

.right {
	width: 100px;
	background: gold;
}

.center {
	flex: 1;
	background: lightgreen;
}
</style>
