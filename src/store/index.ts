// src/store/index.ts
// import { createPinia } from 'pinia'
// import app from './modules/app'
// import getters from './getters'

// const store = createPinia()

// export default store

// vuex
import { createStore } from 'vuex'
import app from './modules/app'
import getters from './getters'
export default createStore({
	modules: {
		app
	},
	getters
})
