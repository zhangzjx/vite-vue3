import { createApp } from 'vue'
import App from '@//App.vue'
import router from '@/router/index'
import store from '@/store'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import SvgIcon from '@/components/SvgIcon/index.vue' // svg组件
import '@/router/permission' // 路由守卫
import elementIcon from '@/plugins/svgicon'
import i18n from '@/i18n'
import configCn from '@/config/pagination' //覆盖官方的pagination选项

import 'element-plus/dist/index.css'
import './style/index.scss'

const app = createApp(App)

// element icon
app.use(elementIcon)

app.component('svg-icon', SvgIcon)

app.use(router)

app.use(store)

app.use(ElementPlus, {
	locale: {
		...zhCn,
		...configCn
	}
})

app.use(i18n)

app.mount('#app') // 将页面挂载到 root 节点
