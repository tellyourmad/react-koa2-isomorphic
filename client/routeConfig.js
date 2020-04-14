import Loadable from "react-loadable";
import { matchPath } from "react-router";
// import loadable from '@loadable/component';
import Loading from "./components/Loading";
const setLoadable = function (section, requireComp) {
  return Loadable({
    loader: section,
    loading: Loading,
  });
};

export const routes = [
  {
    path: "/",
    exact: true,
    redirect: "/Index",
  },
  {
    path: "/Index",
    component: setLoadable(() =>
      import(/* webpackChunkName: "Home" */ "./section/IndexPage/Index.jsx")
    ),
  },
  {
    path: "/ReduxTest",
    component: setLoadable(() =>
      import(/* webpackChunkName: "Mine" */ "./section/ReduxTest/Index.jsx")
    ),
  },
  {
    path: "/AjaxTest",
    component: setLoadable(() =>
      import(/* webpackChunkName: "AjaxTest" */ "./section/AjaxTest/Index.jsx")
    ),
  },
  {
    path: "/PreloadTest",
    exact: true,
    redirect: "/PreloadTest/1",
  },
  {
    path: "/PreloadTest/:page",
    component: setLoadable(() =>
      import(
        /* webpackChunkName: "AjaxTest" */ "./section/PreloadTest/Index.jsx"
      )
    ),
  },
];

export function matchComp(uri) {
  for (let item of routes) {
    // console.log(routers,);
    const match = matchPath(uri, {
      path: item.path,
      exact: item.exact,
      strict: false,
    });
    // 路由匹配逻辑需要优化，这里太笼统了
    if (match) {
      return {
        ...item,
        ...match,
      };
    }
  }
  return false;
}
