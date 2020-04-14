import Router from "koa-router";
import utils from "../common/utils";
import Config from "./config"; // 后端服务地址

const router = new Router({ prefix: "/user" });

router.get("/getUserInfo", async function (ctx) {
  async function delay(time) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve();
      }, time);
    });
  }
  // 设个延时来模拟“请求中”
  await delay(2000);
  ctx.body = await utils
    .sendHttp({
      protocol: Config.protocol,
      host: Config.host,
      port: Config.port,
      path: Config.prefix + "/get_user_info",
      method: "GET",
    })
    .then(function (data) {
      return data;
    });
});

export default router;
