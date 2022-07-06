/*
 * 项目配置
 */

module.exports = {
	OAUTH: {
		//是否执行Auth登录（包括路由、接口检查token有效性）
		excute: false,
		//oauth中请求头内需加密的client_id
		client_id: 'client',
		//oauth中请求头内需加密的client_secret
		client_secret: '123456'
	},
	SM2: {
		publicKey:
			'04c3305bb148615102dd811101cbf43f5af93c5e3dc26656704f5ba234e7a60abee4fc5d41ab8b88e79aafe01094256018027c3b50a0eec351f78f9150e9c91e74',
		privateKey: '00dbb19fb10bb1d5617c8b85b460aa47b72250c134f5ce57163a9638021e0eddca',
		appKey: 'e6b599e6b19fe5ae8fe794b0e58faae883bde7a791e68a80e69c8de58aa1e69c89e99990e585ace58fb8',
		cipherMode: 1
	},
	//系统设置
	APP: {
		//业务中心侧边菜单标题
		title: 'Vite App',
		//主题类型 暂可选['light', 'dark'] *需重启生效
		theme: 'light',
		// 是否显示底部版权（包括Footer的显示）
		copyright: true,
		// 密码安全检查
		security: false
	},

	//http相关
	HTTP: {
		// HTTP请求方式：0-原生请求， 1-警察叔叔
		type: 0,
		// 是否开启代理（为false时，axios请求前缀自动变更为cross_domain）
		proxy: false,
		// 代理跨域地址
		// cross_domain: 'http://112.17.180.66:43004/api/',
		cross_domain: 'https://xjk.zjjcnt.com:46413/api/',
		// 跨域前缀数组
		cross_prefix: ['/api', '/oauth', '/sysadmin'],
		// 返回值内无data属性值的请求
		no_data_urls: ['oauth/token']
	}
}
