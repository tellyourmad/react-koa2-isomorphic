import Router from "koa-router";

const router = new Router({ prefix: "/product" });

const MOCK_DATA = [
  {
    id: 1,
    name: "测试商品one",
  },
  {
    id: 2,
    name: "测试商品two",
  },
  {
    id: 3,
    name: "测试商品three",
  },
  {
    id: 4,
    name: "测试商品four",
  },
  {
    id: 5,
    name: "测试商品five",
  },
  {
    id: 6,
    name: "测试商品six",
  },
  {
    id: 7,
    name: "7777",
  },
  {
    id: 8,
    name: "88888",
  },
  {
    id: 9,
    name: "99999",
  },
  {
    id: 10,
    name: "101010",
  },
];

router.get("/getProductList", async function (ctx) {
  console.log(ctx.query, "ctx");
  async function delay(time) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve();
      }, time);
    });
  }
  // 设个延时来模拟“请求中”
  await delay(2000);
  ctx.body = {
    data: MOCK_DATA.slice(
      ctx.query.size * (ctx.query.page - 1),
      ctx.query.size * ctx.query.page
    ),
  };
});

export default router;
