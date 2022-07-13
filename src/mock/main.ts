import { personData } from './personData'
import { beastData } from './beastData'

const defautData = { personData: personData, beastData: beastData }

const setDefaulttData = (data) => {
	localStorage.setItem('defautData', JSON.stringify(data))
}

const getDefaultData = () => {
	return JSON.parse(localStorage.getItem('defautData'))
}

// 初始化数据
const loadData = (data) => {
	// 随机数 = Math.floor(Math.random() * 可能的总数 + 第一个可能的值)
	data.map((item, index) => (item.level = Math.floor(Math.random() * 100 + 1)))
	data.sort((a, b) => {
		return b.level - a.level
	})
	data.forEach((item, index) => (item['id'] = index + 1))
	return data
}

export { setDefaulttData, getDefaultData, loadData, defautData }
