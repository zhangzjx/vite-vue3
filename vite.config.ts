import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { svgBuilder } from './src/icons/index'
import path from 'path'
// @ts-ignore
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
	base: './', // 打包路径
	plugins: [
		vue(),
		// gzip压缩 生产环境生成 .gz 文件
		viteCompression({
			verbose: true,
			disable: false,
			threshold: 10240,
			algorithm: 'gzip',
			ext: '.gz'
		}),
		// svg 引入
		svgBuilder('./src/icons/svg/')
	],
	// 配置别名
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src')
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@import "@/style/mian.scss";'
			},
			sass: {
				// 8版本用prependData:
				prependData: `
				@import "@/styles/variables.scss";   
				@import "@/styles/mixin.scss";
			  `
			}
		}
	},
	//启动服务配置
	server: {
		host: '0.0.0.0',
		port: 8000,
		open: true,
		https: false,
		proxy: {
			// 代理配置
			'/api': {
				target: 'https://lianghj.top:8888/api/private/v1/',
				changeOrigin: true
			}
		}
	},
	// 生产环境打包配置
	//去除 console debugger
	build: {
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true
			}
		}
	}
})
