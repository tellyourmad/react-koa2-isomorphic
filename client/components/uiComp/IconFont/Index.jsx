import React from 'react';
import PropTypes from 'prop-types';
import styles from './style';
import classNames from "../../../utils/classNames";



function IconFont(props){
    const {className,children,dangerouslySetInnerHTML,...otherProps}=props;
    if(dangerouslySetInnerHTML){
        return (
            <span
                {...otherProps}
                dangerouslySetInnerHTML={{__html:dangerouslySetInnerHTML}}
                className={classNames(styles.icon,className)}
            >{children}</span>
        )
    }
    return (
        <span
            {...otherProps}
            className={classNames(styles.icon,className)}
        >{children}</span>
    )
}

IconFont.propTypes={
    children:PropTypes.node
}

export default IconFont;