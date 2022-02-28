import { createI18n } from 'vue-i18n'
import EN from './en'
import ZH from './zh'
import EN1 from './modules/en'
import ZH1 from './modules/zh-cn'
const messages = {
	en: {
		...EN1
	},
	zh: {
		...ZH1
	}
}

const getCurrentLanguage = () => {
	const UAlang = navigator.language // 初始通过浏览器获取语言 zh-CN
	const langCode = UAlang.indexOf('zh') !== -1 ? 'zh' : 'en'
	localStorage.setItem('lang', langCode)
	return langCode
}

const i18n = createI18n({
	legacy: false,
	globalInjection: true,
	locale: getCurrentLanguage() || 'zh',
	messages: messages
})

export default i18n
