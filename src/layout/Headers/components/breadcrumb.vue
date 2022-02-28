<template>
	<el-breadcrumb separator="/">
		<el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">
			<span class="no-redirect" v-if="index === breadcrumbList.length - 1">
				{{ $t(`${item.meta.title}`) }}
			</span>
			<span class="redirect" v-else @click="handleRedirect(item.path)">
				{{ $t(`${item.meta.title}`) }}
			</span>
		</el-breadcrumb-item>
	</el-breadcrumb>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const breadcrumbList = ref([])

const initBreadcrumbList = () => {
	// 路由表
	breadcrumbList.value = route.matched
	console.log('路由表bread', route.matched)
}

const handleRedirect = (path) => {
	router.push(path)
}

watch(
	route,
	() => {
		initBreadcrumbList()
	},
	{ deep: true, immediate: true }
)
</script>

<style lang="scss" scoped>
.no-redirect {
	color: #97a8be;
	cursor: text;
}
.redirect {
	color: #666;
	font-weight: 600;
	cursor: pointer;
	&:hover {
		// color: $menuBg;
		color: #1f2d3d;
	}
}
</style>
