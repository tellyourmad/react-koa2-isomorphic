import React from 'react';
import styles from './style';

import {connect} from 'react-redux';
import {mapStateToProps,mapDispatchToProps} from '../../redux/connect';

class Mine extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const {ReduxState} = this.props;
        return (
            <div className={styles.entryProcess}>
                <div className={styles.banner} style={{backgroundImage:`url(${require('@Images/EntryProcess/BannerBg.png')})`}}>
                    <img src={require('@Images/EntryProcess/Computer.png')}/>
                </div>
                <p>name:{ReduxState.user.name||'无'};password:{ReduxState.user.password||'无'};</p>
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Mine)