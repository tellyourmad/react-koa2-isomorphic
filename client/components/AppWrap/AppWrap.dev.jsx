import React, {Component} from 'react';
import AppWrap from "./AppWrap";



class Root extends Component {
    constructor() {
        super();
        this.state = {isMounted: false}
    }

    componentDidMount() {
        this.setState({isMounted: true})
        console.log('Redux Devtools is now available. Press key "ctrl-h" to toggleVisibility. Press key "ctrl-w" to changePosition.')
    }

    render() {
        const {children,...props}=this.props;
        return (
            <AppWrap {...this.state} {...props}>
                {children}
            </AppWrap>
        )
    }
}

export default Root