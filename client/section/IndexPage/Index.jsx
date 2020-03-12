import React from "react";
import styles from "./style";

import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../../redux/connect";
import ActionTypes from "../../redux/ActionTypes";

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.ReduxState.user.name,
      pwd: props.ReduxState.user.password,
      saved: false
    };
  }
  submit() {
    console.log("保存到redux上", this.state);
    this.props.ReduxAction(ActionTypes.CHANGE_NAME, this.state.name);
    this.props.ReduxAction(ActionTypes.CHANGE_PWD, this.state.pwd);
    this.setState({ saved: true });
  }
  render() {
    return (
      <div className={styles.indexPage}>
        <p className={styles.title}>首页首页文案</p>
        <ul>
          <li>
            <span>账号：</span>
            <input
              value={this.state.name}
              onChange={e =>
                this.setState({ name: e.target.value, saved: false })
              }
            />
          </li>
          <li>
            <span>密码：</span>
            <input
              value={this.state.pwd}
              onChange={e =>
                this.setState({ pwd: e.target.value, saved: false })
              }
            />
          </li>
        </ul>
        <div className={styles.btn} onClick={this.submit.bind(this)}>
          提交
        </div>
        {this.state.saved && <p>保存成功，请到“我的”页面查看</p>}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
