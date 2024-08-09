---
title: 使用 pnpm 创建 monorepo 脚手架
createTime: 2024-07-25
updateTime: 2024-07-25
authors: hush
tag: cli, vite
cover: create-monorepo-cli.jpg
---

## 前言

说一个场景, 我们现在需要写一个组件库, 还需要写一个工具库, 而这个组件库依赖于工具库, 这两个库更新频率会比较高, 我希望这两个库分开发布

因此问题来了, 我怎么在一个库里边能快速引用另一个库, 且快速更新发布对应的库

有个解决方案叫做 `monorepo` , 简单来说就是，将多个项目或包文件放到一个git仓库来管理

`monorepo` 仓库大致如下文件夹结构:

```bash
├── apps
|   ├── docs
├── packages
|   ├── pkg1
|   ├── pkg2
├── package.json
```

文件名称可以自定义, 我这里使用的是 `apps` 下放置示例项目或者文档, `packages` 中放置组件库、工具库等, 每个pkg都是单独的一个项目

此时我们可以定义这整个仓库为一个 `monorepo` 仓库, `apps` 和 `packages` 文件夹下的项目都是该仓库下的项目, 他们直接可以通过本地链接的形式直接引用对方作为依赖, 这样可以便于管理和同步联调

`pnpm` 默认支持 `monorepo` , 也可以使用 `lerna` 进行管理

下方介绍以pnpm进行管理

## 创建monorepo仓库

1. 创建一个空文件夹并执行如下命令

```shell
pnpm init
```

2. 调整 `package.json`

* 添加 `engines`, 指定node、pnpm最低版本

* 设置 `private` 属性为 `true`, 防止当前仓库整体被发布

* 添加 `workspaces`, 指定当前仓库为 monorepo 格式

```json
{
	"private": true,
	"engines": {
		"node": ">=16",
		"pnpm": ">=7"
	},
	"workspaces": ["packages/*", "apps/*"]
}
```

3. 根目录添加 `pnpm-workspace.yaml` 文件, 配置 `monorepo` 仓库信息

```yaml
packages:
  - 'packages/*'
  - 'apps/*'
```

4. 根目录添加 `.npmrc` 文件, 填写如下内容

> 如不做这一步可能导致子模块安装子模块时只从远端安装, 不从本地安装依赖

```bash
link-workspace-packages = true 		# 启用工作区内部的包链接
prefer-workspace-packages = true 	# 优先选择工作区中的包
recursive-install = true 			# 递归地安装工作区中所有项目的依赖
```

## 初始化子仓库

我希望建立一个components组件库, 一个utils工具库, 一个doc文档库, 
这个doc文档库展示当前最新的组件和工具方法

这里我以如下仓库结构作为示例:

```bash
├── apps
|   ├── docs
├── packages
|   ├── components
|   ├── utils
├── package.json
```

因为用了 `monorepo` 格式, 所以证明我们应该会发布多个包, 因此应该用统一个命名前缀, 假设我们这里使用 `@hush` 作为前缀

### 初始化components

在 `packages` 目录下创建文件夹 `components` , 进入目录执行如下命令

```bash
pnpm create vite
```

创建完成后进入 `components/package.json` 文件中  
调整包名为 `@hush/components` , 删除 `devDependencies` 项中的 `typescript` , 因为 `ts` 将会在我们各个仓库中用到, 因此可以将公共依赖放到根目录安装

到根目录执行如下命令:

```
pnpm add typescript -D -w
```

`-w` 参数用来确认是在根目录安装该依赖

### 初始化utils

在 `packages` 目录下创建文件夹 `utils` , 进入目录执行如下命令

因为 `ts` 已经挪到根目录, 所以不需要安装 `typescript` , 可以直接用ts

```bash
pnpm init -y

npx tsc --init
```

这个仓库我只放一些公共方法, 所以不需要什么脚手架

创建文件夹结构如下:

```bash
├── utils
|   ├── src
|   |   ├── index.ts
|   ├── test
|   ├── package.json
```

package.json文件修改如下:

```json
{
	"name": "@hush/utils",
	"version": "1.0.0",
	"private": false,
	"files": ["dist", "README.md"],
	"types": "./dist/index.d.ts",
	"main": "./dist/index.js",
	"module": "./dist/index.js",
	"exports": {
		"./*": "./*",
		".": {
			"types": "./dist/index.d.ts",
			"import": "./dist/index.js",
			"require": "./dist/index.js"
		}
	},
	"scripts": {
		"build": "tsc"
	}
}
```

`tsconfig.json` 配置文件中添加如下配置:

```json
{
	"rootDir": "./src",
	"outDir": "./dist",
	"declaration": true
}
```

配置 `src/index.ts` 添加一个示例方法

```ts
// index.ts
export const getVersion = () => {
	return 'V1.0.0'
}
```

此时即可执行 `pnpm build` 打包, 打包结果会放到 `dist` 目录下

### components使用utils包

先进入utils目录下执行命令

```bash
pnpm build
```

进入components目录下执行命令

```bash
pnpm add @hush/utils

// or 在根目录执行如下命令
pnpm add @hush/utils -F @hush/components
```

成功后可以看到 `components` 项目 `package.json` 文件中 `dependencies` 项中添加了 `"@hush/utils": "workspace:^",` , 
这个版本为 `workspace:^` 指的就是从本地取对应的依赖, 因此对应的依赖也需要先打包才行

此时可以看到 `components` 项目中的 `node_modules` 里的 `@hush/utils` 目录结构和项目代码一致, 是因为 monorepo 架构就是将本地依赖以软链接的形式引入

![](/images/create-monorepo-cli/code-catalog.png)

### 测试

在 `components` 项目中引用 `@hush/utils` 包中的方法, 按理说已经有ts类型提示, 访问页面确认方法正常执行即可

## 安装依赖

上述过程中已经安装 `typescript` 到根目录, 这里继续完善脚手架其他部分
