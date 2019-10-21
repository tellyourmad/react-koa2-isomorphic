import React from 'react';
import styles from './style';

export default function CoverDiv(props){
    return (
        <div
            {...props}
            className={styles.div+" "+(props.className||"")}
        >
            {props.children}
        </div>
    )
}