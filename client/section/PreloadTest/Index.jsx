import React from "react";

import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "@redux/connect";

import ActionTypes from "@redux/ActionTypes";
import ajax from "@utils/ajax";

const PAGE_SIZE = 2;

class PreloadTest extends React.Component {
  constructor(props) {
    super(props);
  }
  ajaxInstance = null;
  static async ssrInitRedux(route, store, ctx) {
    const res = await ajax.send({
      ctx,
      url: `/api/product/getProductList?page=${1}&size=${
        route.params.page * PAGE_SIZE
      }`,
      type: "get",
    });
    store.dispatch({
      type: ActionTypes.PRODUCT_LIST,
      preload: {
        list: res.data,
        page: route.params.page,
      },
    });
  }
  async componentDidMount() {
    const { match, ReduxState, ReduxAction } = this.props;
    if (ReduxState.product.loadedPage >= 1) {
      return;
    }
    const res = await this.fetchData(match.params.page, true);
    ReduxAction(ActionTypes.PRODUCT_LIST, {
      list: res.data,
      page: match.params.page,
    });
  }
  async getMore() {
    const { ReduxState, ReduxAction } = this.props;
    console.log(ReduxState);
    const res = await this.fetchData(ReduxState.product.loadedPage + 1);
    ReduxAction(ActionTypes.PRODUCT_LIST, {
      list: res.data,
      page: ReduxState.product.loadedPage + 1,
    });
  }
  fetchData(page, isInit) {
    if (this.ajaxInstance) {
      this.ajaxInstance.abort();
    }
    let size = PAGE_SIZE;
    if (isInit) {
      size = page * PAGE_SIZE;
      page = 1;
    }
    return ajax.send(
      {
        url: `/api/product/getProductList?page=${page}&size=${size}`,
        type: "get",
      },
      (instance) => (this.ajaxInstance = instance)
    );
  }
  componentWillUnmount() {
    if (this.ajaxInstance) {
      this.ajaxInstance.abort();
    }
  }
  render() {
    const { ReduxState } = this.props;
    return (
      <div>
        <p>以下数据在服务端中已经请求完成并注入到store中：</p>
        <p>
          已经加载了{ReduxState.product.listLoadedPages}页，每页{PAGE_SIZE}条。
        </p>
        <ul>
          {ReduxState.product.list.map((item) => (
            <li key={item.id}>
              <span>id：{item.id}；</span>
              <span>name：{item.name}；</span>
            </li>
          ))}
        </ul>
        <button onClick={this.getMore.bind(this)}>加载更多~</button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PreloadTest);
