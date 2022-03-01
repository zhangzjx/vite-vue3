// 定义一个函数：isValidKey()，然后对需要使用到的地方进行一次判断
export function isValidKey(
	key: string | number | symbol,
	object: object
): key is keyof typeof object {
	return key in object
}

// 示例
// import { isValidKey } from '@/utils/isValidKey'
// for (const iconName in ELIcons) {
// 	if (isValidKey(iconName, ELIcons)) {
// 		app.component(iconName, ELIcons[iconName])
// 	}
// }