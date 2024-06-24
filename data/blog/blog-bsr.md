---
title: vercel+next+node搭建服务端渲染博客(BSR)
createTime: 2023-08-01
updateTime: 2023-08-01
authors: hush
tag: blog,Next,mongodb,TailwindCSS
---

准备做一个博客, 预先准备使用 `react` 编写博客, 根据小马哥的博客得到的启发, 直接用 `Next + TailwindCSS` 编写该博客, 因此开始学习下预备知识.

### 技术栈

* 使用 `next+TailwindCSS` 开发前端页面, 用 `node+mongodb` 作为后台, 基于功能量比较少, 于是选择 `express` 作为服务端框架
* 使用 `vercel` 进行前端后端静态代码部署, 数据库使用 `MongoDB Cloud` 免费存储

用**next**渲染博客类项目再好不过了, 服务端渲染结构可以让页面秒出, 没有白屏时间

使用**tailwind**也是因为既然想要扩展自己的视野, 且市面上也没有类似的组件库, 既然是要自己写样式, 那就不如用这类原子库去编写, 开始时会很不适应, 啥也不知道, 得翻着文档操作, 后续熟练一点效率就上去了, 最重要的是做移动端适配很方便

### TailwindCSS

简单说, 这还算是一个原子库, 但是他提供的不止是一些基础类名, 还支持通过配置扩展和修改新类名对应的样式, 具体查看这个文章

### Next

简单说, `Next` 是以 `react` 为基座编写的上层框架, 可以方便的开发出服务端渲染的页面

最初前端开发需要编写html、js、css 文件, 纯手搓功能, 不容易维护, 代码量巨大, 后续出了一系列工具都是在简化代码量, 但是此时的渲染方式还是以html为主, html中已经包含了当前页面的dom结构, 浏览器接收到html时就已经可以很快的渲染完成页面, 后续加载js执行逻辑.

基于代码量大难维护, 且不同开发者编写的结构不同, 出现了react、vue等上层框架, 为了统一开发规范以及优化开发模式, 且为了大型项目的性能以及规范着想, 做了很多js优化的事情, 导致页面都是通过js操作dom渲染形成的, 无论在seo上还是加载上都会慢于原生开发.

因此next的诞生就是为了解决这个问题, 其实很好理解, 就是将现在的开发模式下的js代码改为生产模式下的原生html代码, 开发阶段保持正常react格式开发, 但是打包后生成的是一个个html文件

### 前端编码

这里我采用的是BSR渲染, 因为希望博客系统能支持在线录入文档且发布, 能在线上进行增删改插, 全程线上操作

基于我的之前vite脚手架搭建的代码目录结构, 我还是将该项目分成如下结构

```bash
|-- src
    |-- components  # 基础组件
    |-- config      # 公共配置
    |-- features    # 业务组件
    |-- hook        # 自定义hook
    |-- pages       # 路由页面组件
    |-- providers   # 自定义provider
    |-- styles      # 样式
    |-- types       # types
    |-- utils       # 工具库
```

因为采用tailwind作为样式库, 所以编写了部分公共组件, 比如 `Input` 、 `Tag` 、 `Dialog` 、 `Message` 、 `Button` 等

其中md编辑器及渲染器采用的是 `bytemd` , 仿照掘金的编辑器, 但是md样式方面我使用的是 `tailwindcss/forms` 中的 `prose` , 

其实可以使用bytemd提供的一些样式案例, 比如**github、掘金**等样式, 但我希望尽量减少三方包引入, 做个足够轻量的博客, 且 `prose` 样式也还不错

具体编辑器详情可查看这篇文章(地址)

### 后端编码

后端通过 `mongoose` 操作数据库, 通过 `jsonwebtoken` 生成token对用户进行权限校验

这里将目录结构分配为如下格式

```bash
|-- src
    |-- db  				# 表结构
    |-- router    	# 路由
    |-- service    	# 操作数据库方法
    |-- test        # 测试
    |-- utils       # 工具库
```

其中路由只能调用 `service` 层, `service` 操作数据库且返回数据

test目录是使用vscode插件 `REST Client` 快速测试用的, 该插件支持配置一个.http为后缀的文件, 内容结构如下

```http
###
// 登录接口
POST http://127.0.0.1:8000/login
content-type: application/json

{
    "name":"test",
    "password":"123"
}
```

此时vscode页面上会有一个 `Send Request` 按钮, 点击即可快速请求

我将所有接口在此处存放一份, 方便快速调试

### 部署

因为想部署在vercel上, 前端静态资源比较好部署, 但是node项目如何部署呢?

#### 静态项目部署

前端部署时添加一个环境变量

```bash
#.env.development
NEXT_PUBLIC_API_HOST="http://127.0.0.1:8000"
NEXT_PUBLIC_API_BASE_PATH="/blog"
```

```bash
#.env.production
NEXT_PUBLIC_API_HOST="https://backend.app"
NEXT_PUBLIC_API_BASE_PATH="https://backend.app"
```

在请求拦截器地方将所有请求添加前缀

```bash
baseURL: process.env.NEXT_PUBLIC_API_BASE_PATH
```

在 `next.config.js` 添加如下编辑

```js
module.exports = {
    // 接口代理
    async rewrites() {
        return [{
            source: "/blog/:path*",
            destination: `${process.env.NEXT_PUBLIC_API_HOST}/:path*`,
        }, ];
    },
}
```

此时开发环境将代理到本地8000端口上, 而生产环境则代理到对应后端服务上

#### node项目部署

package.json添加如下命令

```json
"script": {
	"dev": "nodemon index.js",
 	"start": "node index.js",
 	"build": "node index.js",
}
```

因为vercel部署时执行的是build命令

然后在根目录添加 `vercel.json` 文件, 用来解决跨域请求问题

```json
{
  "version": 2,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        },
        {
          "key": "Access-Control-Allow-Headers",
          "value": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "DELETE,PUT,POST,GET,OPTIONS"
        }
      ]
    }
  ],
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node"
    }
  ],
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```

此时部署应该就可以访问到node项目了

### 问题

1. 暂时没有购买域名,因此vercel部署的网站国内经常访问不到
2. 为了实现全部线上操作的功能, 最终采用的**BSR**渲染方式并没有完全发挥**next**框架的优势, 会导致数据出来较慢,当然这是接口响应和网络的问题
3. `bytemd`编辑器不错, 但是渲染器只是md渲染器, 没办法进行代码复制, 文章目录, 嵌入代码实例等功能

### 优化方案

1. 购买个域名代理一下
2. 再对比下后续维护方式, 如果采用SSG方式,纯静态页面渲染, 只有点赞阅读量评论等通过后台管理, 则会更提高访问速度, 只是每次更新文章都需要提交代码
3. 使用mdx渲染



#### 链接

https://maqib.cn/blog/Refactoring-my-blog-using-NextJS-and-TailwindCSS

https://q-blog-front.vercel.app