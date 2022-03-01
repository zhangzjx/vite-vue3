# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3
这个模板应该可以帮助你开始使用 Vue 3 和 Vite 中的 Typescript 进行开发。该模板使用 Vue 3
`<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.
由于 TypeScript 无法处理 ".vue" 导入的类型信息，因此默认情况下，它们被填充为通用 Vue 组件类型。在大多数情况下，如果您并不真正关心模板之外的组件属性类型，这很好。但是，如果您希望在".vue"导入中获得实际的 prop 类型（例如，在使用手动 'h（...） 时获取 props 验证）' 调用），您可以通过从 VSCode 命令面板运行"Volar：打开/关闭 TS 插件"来启用 Volar 的 ".vue" 类型支持插件。

## 部署步骤

**npm install**
**npm run dev**

## 目录结构

```sh
.
├── public # 静态资源
├── src # 项目代码
│   ├── assets # 静态资源
# │   ├── axios-config # axios配置
│   ├── components # 公用组件
# │   ├── directive # 自定义指令
# │   ├── hooks # 常用hooks
│   ├── i18n # 国际化
│   ├── icon # 自定义svg
│   ├── layout # 布局组件
# │   ├── plugins # 外部插件
│   ├── mock # 模拟数据
│   ├── router # 路由配置
│   │    └── permission.ts # 路由拦截
│   ├── store # 状态管理
│   ├── styles # 全局样式
# │   ├── types # 全局类型
│   ├── utils # 全局工具类
│   ├── views # 路由页面
│   ├── App.vue # 入口vue文件
│   ├── main.ts # 主入口文件
│
# ├── .babelrc # babel配置
# ├── .editorconfig # 编辑器配置
├── .eslintignore # eslint 忽略配置项
├── .eslintrc # eslint 配置文件
├── .gitignore # git 忽略提交配置文件
├── .postcssrc.js # postcss 配置文件
├── .prettierrc.js # 代码格式 配置文件
# ├── .stylelintignore # stylelint 忽略文件
# ├── CHANGLOG.md # 更新日志
# ├── commitlint.config.js # git commit 配置文件
├── package.json
├── README.md # 项目说明
# ├── stylelint.config # stylelint配置文件
├── tsconfig.json # ts 配置文件
└── vite.config.ts # vite配置

```
