import React from 'react';
import { NavLink, Link } from "react-router-dom";
import styles from './style';





class HeaderNav extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <nav className={styles.headerNav}>
                <NavLink
                    activeClassName={styles.active}
                    to='/Index'
                >首页</NavLink>
                <NavLink
                    activeClassName={styles.active}
                    to='/BusinessPartner'
                >招商计划</NavLink>
                <NavLink
                    activeClassName={styles.active}
                    to='/Mine'
                >我的</NavLink>
            </nav>
        );

    }
}
export default HeaderNav