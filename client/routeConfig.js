import Loadable from "react-loadable";
// import loadable from '@loadable/component';
import Loading from "./section/Loading";

const setLoadable = function(section) {
  return Loadable({
    loader: section,
    loading: Loading
  });
};

export const routes = [
  {
    path: "/",
    exact: true,
    redirect: "/Index"
  },
  {
    path: "/Index",
    component: setLoadable(() =>
      import(/* webpackChunkName: "Home" */ "./Section/IndexPage")
    )
  },
  {
    path: "/Mine",
    component: setLoadable(() =>
      import(/* webpackChunkName: "Mine" */ "./Section/Mine")
    )
  },
  {
    path: "/AjaxTest",
    component: setLoadable(() =>
      import(
        /* webpackChunkName: "AjaxTest" */ "./Section/AjaxTest"
      )
    )
  }
];

export function matchComp(uri) {
  for (let { path, component } of routes) {
    // 路由匹配逻辑需要优化，这里太笼统了
    if (new RegExp(`^${path}(/?|(/[^/]+)*)$`).test(uri)) {
      return component;
    }
  }
  return false;
}
