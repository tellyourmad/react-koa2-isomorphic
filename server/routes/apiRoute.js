import fs from "fs";
import path from "path";
import Router from "koa-router";
const router = new Router({ prefix: "/api" });
let subRouter;

/// 后端接口我是用在线工具伪造的，下面是链接，自己可以尝试配置一个后端接口，然后使用node来转发
/// http://mockhttp.cn/

// 遍历apiRetrans文件夹中的js文件
fs.readdirSync(path.resolve(__dirname, "../apiRetrans")).forEach(filename => {
  if (/\.js$/.test(filename)) {
    // 执行js文件，配置api路由
    subRouter = require(`../apiRetrans/${filename}`);
    router.use(subRouter.routes(), subRouter.allowedMethods());
  }
});

export default router;
