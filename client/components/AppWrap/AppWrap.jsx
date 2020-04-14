import React, { Component } from "react";

import Tabbar from "./Tabbar";
import CoverDiv from "../uiComp/CoverDiv";
import DevTools from "../../redux/DevTools";

import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../../redux/connect";

import styles from "./AppWrap.less";
import Loading from "../Loading";
import classNames from "../../utils/classNames";

class AppWrap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onLoaded: false,
    };
  }
  componentDidMount() {
    this.setState({ onLoaded: true });
  }
  render() {
    return (
      <CoverDiv className={styles.app}>
        {!this.state.onLoaded && <Loading />}
        {!!this.props.isMounted && <DevTools />}
        <div
          className={classNames(
            styles.section,
            this.state.onLoaded && styles.visible
          )}
        >
          <div className={styles.mainWrap}>{this.props.children}</div>
          <Tabbar />
        </div>
      </CoverDiv>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppWrap);
