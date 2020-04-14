import React from "react";
import styles from "./style";

import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "@redux/connect";

import img from "@Images/BannerBg.png";

class ReduxTest extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { ReduxState } = this.props;
    console.log(ReduxState.user);
    return (
      <div className={styles.mine}>
        <p>图片的使用：</p>
        <div
          className={styles.banner}
          style={{ backgroundImage: `url(${img})` }}
        >
          <img src={img} />
        </div>
        <br />
        <br />
        <p>redux中数据：</p>
        <div className={styles.text}>
          <p>{ReduxState.user.message}</p>
          <p>name:{ReduxState.user.name || "无"};</p>
          <p>password:{ReduxState.user.password || "无"};</p>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxTest);
