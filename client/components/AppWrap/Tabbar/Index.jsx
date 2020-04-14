import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./style";

class Tabbar extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <nav className={styles.tabbar}>
        <NavLink activeClassName={styles.active} to="/Index">
          首页
        </NavLink>
        <NavLink activeClassName={styles.active} to="/AjaxTest">
          接口测试
        </NavLink>
        <NavLink activeClassName={styles.active} to="/ReduxTest">
          Redux演示
        </NavLink>
        <NavLink activeClassName={styles.active} to="/PreloadTest">
          预加载演示
        </NavLink>
      </nav>
    );
  }
}
export default Tabbar;
