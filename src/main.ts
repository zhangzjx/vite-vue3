import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/style/index.scss'
import SvgIcon from '@/components/SvgIcon/index.vue' // svg组件
import '@/router/permission' // 路由守卫
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ELIcons from '@element-plus/icons-vue'
import i18n from '@/i18n'
import { isValidKey } from '@/utils/isValidKey'

// createApp(App).mount('#app')
const app = createApp(App)

for (const iconName in ELIcons) {
	if (isValidKey(iconName, ELIcons)) {
		app.component(iconName, ELIcons[iconName])
	}
}
app.component('svg-icon', SvgIcon)

app.use(router)

app.use(store)

app.use(ElementPlus)

app.use(ElementPlus, {
	locale: zhCn
})
app.use(i18n)

app.mount('#app') // 将页面挂载到 root 节点
