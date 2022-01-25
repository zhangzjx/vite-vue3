import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

// createApp(App).mount('#app')
const app = createApp(App)

app.use(router)

app.use(store)

app.use(ElementPlus)

app.use(ElementPlus, {
	locale: zhCn
})

app.mount('#app')
