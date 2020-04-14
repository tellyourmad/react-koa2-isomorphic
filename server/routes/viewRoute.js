import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router";
import { Provider } from "react-redux";
import configureStore from "../../client/redux/configureStore";
import App from "../../client/App";
import { matchComp } from "../../client/routeConfig";

// 配置页面路由
async function viewRoute(ctx, next) {
  // 因为所有请求，不单单是页面请求，包括图片请求都会进入本方法，必须判断该url是否匹配上页面路由
  const item = matchComp(ctx.url);
  // console.log(item, "item");
  if (item) {
    if (item.redirect) {
      ctx.redirect(item.redirect);
      return;
    }

    // 服务端重新接手时，重新构建store
    const store = configureStore();

    if (process.env.NODE_ENV === "production" && item.component.preload) {
      // development环境下，组件无法预渲染
      const preload = await item.component.preload(); // 因为代码分包，故先触发预加载组件
      if (
        preload &&
        preload.WrappedComponent &&
        preload.WrappedComponent.ssrInitRedux
      ) {
        await preload.WrappedComponent.ssrInitRedux(item, store, ctx); // 触发component内的静态方法，实现数据的预加载
      }
    }

    await ctx.render("index", {
      // 渲染dom有多种方法，这里只最简单的[renderToString]
      root: ReactDOMServer.renderToString(
        <Provider store={store}>
          <StaticRouter location={ctx.url} context={{}}>
            <App />
          </StaticRouter>
        </Provider>
      ),
      state: store.getState(),
    });
  } else {
    await next();
  }
}

export default viewRoute;
