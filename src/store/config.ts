/*
 * @Description:系统配置
 */

import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', {
	state: () => {
		return {
			menus: [],
			isSider: true, // 左侧导航栏初始状态
			lang: localStorage.getItem('lang') || 'zh'
		}
	},
	getters: {
		siderState: (state) => {
			return state.isSider
		},
		langState: (state) => {
			return state.lang
		}
	},
	actions: {
		updateSider(data) {
			this.isSider = data
		},
		updateLang(data) {
			this.lang = data
			localStorage.setItem('lang', data)
		}
	}
})
