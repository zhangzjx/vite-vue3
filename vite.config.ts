import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { svgBuilder } from './src/icons/index'
import path from 'path'
// @ts-ignore
import viteCompression from 'vite-plugin-compression'
import progress from 'vite-plugin-progress'

export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

	return defineConfig({
		base: process.env.VITE_APP_BASE, // 打包路径
		plugins: [
			vue(),
			// 打包进度条
			progress({
				format: 'building [:bar] :percent',
				total: 200,
				width: 60,
				complete: '=',
				incomplete: ''
			}),
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
					additionalData: '@import "./src/style/mian.scss";'
				}
			}
		},
		// 启动服务配置
		server: {
			host: '0.0.0.0',
			port: 9848,
			open: false, // 默认打开浏览器
			https: false,
			proxy: {
				// 代理配置
				'/prod': {
					target: 'https://lianghj.top:8888/api/private/v1',
					changeOrigin: true, // 跨域
					ws: true, // 是否代理
					rewrite: (path) => path.replace(/^\/prod/, '')
				},
				// 代理配置
				'/dev': {
					target: 'http://192.168.10.46:8888/api',
					changeOrigin: true,
					ws: true,
					rewrite: (path) => path.replace(/^\/dev/, '')
				}
			}
		},
		// 生产环境打包配置
		//去除 console debugger
		build: {
			outDir: process.env.VITE_APP_DIR,
			terserOptions: {
				compress: {
					drop_console: true,
					drop_debugger: true
				}
			}
		}
	})
}
