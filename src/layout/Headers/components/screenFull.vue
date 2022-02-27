<template>
	<div @click="handleFullScreen" id="screenFul">
		<svg-icon :name="icon ? 'exit-fullscreen' : 'fullscreen'"></svg-icon>
	</div>
</template>

<script setup lang="ts">
import screenfull from 'screenfull'
import { ref, onMounted, onBeforeMount } from 'vue'

const icon = ref(screenfull.isFullscreen)
const handleFullScreen = () => {
	if (screenfull.isEnabled) {
		screenfull.toggle()
	}
}

const changeIcon = () => {
	icon.value = screenfull.isFullscreen
}

onMounted(() => {
	screenfull.on('change', changeIcon)
})

onBeforeMount(() => {
	screenfull.off('change', changeIcon)
})
</script>

<style lang="scss" scoped></style>
