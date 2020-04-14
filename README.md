# react-koa2-isomorphic

这是一个 React 实现同构（Universal or Isomorphic）的模板

#### 特点

首屏服务端渲染（SSR）的 SPA 项目

#### 主要使用的依赖

- react v16.3.2+
- redux v4.0.0+
- koa v2.5.1+
- pm2 v2.10.3+
- node v13.2.0

#### 什么是服务端渲染（SSR）

- 何为渲染，以下分成两种情况：
  1. 解析 html/css/js，最终生成渲染树
  2. 发送请求获得数据或其它原因修改数据，触发渲染树的更新
- “服务端渲染”又做了什么？
  1. 在服务端完成“js 到 dom”的解析过程（ng/vue/react 通过 webpack 打包后都是主要生产物为 js）
  2. 在服务端完成“首次数据的加载”，将“首页”数据获取成功并填充到渲染树中再返回完整的“页面”（此步可选）
- 为什么要使用 SSR？
  - 首先需要先了解从请求这个页面开始，发生了什么后，才能看到该页面：
      <table style="text-align:center;">
          <tr>
              <th colspan="2">angular/vue/react</th>
          </tr>
          <tr>
              <th>SSR</th>
              <th>非SSR</th>
          </tr>
          <tr>
              <td>服务端-解析部分js</td>
              <td style="color:red;">客户端-下载html</td>
          </tr>
          <tr>
              <td>服务端-注入DOM</td>
              <td>客户端-下载html里面的js</td>
          </tr>
          <tr>
              <td style="color:red;">客户端-下载html</td>
              <td>客户端-解析js</td>
          </tr>
          <tr>
              <td></td>
              <td>客户端-注入DOM</td>
          </tr>
      </table>
  - 容易生成一个 SEO 友好的页面
  - 首屏加载更快
- 为什么要使用 node？
  - ng/vue/react 通过 webpack 打包后生产出 js 和 css 文件
  - 需要使用 node 执行这些 js 文件

#### 架构

<table style="text-align:center;">
    <tr>
        <td rowspan="2">划分</td>
        <td colspan="2">前端</td>
        <td>后端</td>
    </tr>
    <tr>
        <td>UI</td>
        <td>node服务</td>
        <td>业务服务</td>
    </tr>
    <tr>
        <td rowspan="5">工作</td>
        <td rowspan="4">页面呈现</td>
        <td>接口转发</td>
        <td rowspan="5">提供数据接口</td>
    </tr>
    <tr>
        <td>登录状态保持</td>
    </tr>
    <tr>
        <td>资源和数据缓存</td>
    </tr>
    <tr>
        <td>页面（数据）预渲染</td>
    </tr>
    <tr>
        <td colspan="2">视图路由控制</td>
    </tr>
    <tr>
        <td>技术选型</td>
        <td>vue/react</td>
        <td>nuxt/koa</td>
        <td></td>
    </tr>
</table>

#### 备注

server 端入口文件有两个（dev 和 prod），而 dev 环境使用 nodemon 实现热加载，因为热加载的原因，dev 环境并没有 ssr

#### 不足与未做到的事

1. 热加载不够迅速，没有做到自动推送
2. 路由匹配逻辑待优化
3. 未使用 react-hook
4. loading 组件样式并未实现自动注入
