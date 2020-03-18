import React from "react";
import styles from "./style";
import ajax from "@utils/ajax";

export default class AjaxTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null
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
  getUserInfo() {
    ajax
      .send({
        url: "api/user/getUserInfo",
        type: "get"
      })
      .then(res => {
        this.setState({
          userInfo: res
        });
        console.log(res);
      });
  }
  render() {
    return (
      <div className={styles.ajaxTest}>
        <p className={styles.title}>下面是发送请求演示：</p>
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
