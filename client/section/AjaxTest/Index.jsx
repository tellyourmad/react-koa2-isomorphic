import React from "react";
import PropTypes from "prop-types";
import styles from "./style";
import ajax from "@utils/ajax";

class AjaxTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accepting: false,
      userInfo: null,
    };
  }
  // async UNSAFE_componentWillMount() {
  //   const res = await ajax.send({
  //     url: "api/user/getUserInfo",
  //     type: "get"
  //   });
  //   console.log(res)
  //   a = res;
  // }
  async getUserInfo() {
    this.setState({
      accepting: true,
    });
    ajax
      .send({
        url: "api/user/getUserInfo",
        type: "get",
      })
      .then((res) => {
        this.setState({
          userInfo: res,
        });
        this.setState({
          accepting: false,
        });
      });
  }
  render() {
    console.log(this.context);
    return (
      <div className={styles.ajaxTest}>
        <p className={styles.title}>下面是发送请求演示：</p>
        {this.state.accepting && <div>请求中（接口加了个2s延迟）...</div>}
        {this.state.userInfo && (
          <div>
            <p>账号:{this.state.userInfo.name}</p>
            <p>手机号:{this.state.userInfo.mobile}</p>
            <p>id:{this.state.userInfo.id}</p>
          </div>
        )}
        <div className={styles.btn} onClick={this.getUserInfo.bind(this)}>
          发送请求
        </div>
      </div>
    );
  }
}

AjaxTest.contextTypes = {
  test: PropTypes.number,
};

export default AjaxTest;
