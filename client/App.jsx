import React from 'react';
import {Route,Redirect,Switch,withRouter} from "react-router-dom";
import AppWrap from "./components/AppWrap";
import routeConfig from './routeConfig';
import NotFound from "./section/404";

class App extends React.Component{
    constructor(){
        super();
    }
    render(){
        const {location}=this.props;
        return (
            <AppWrap location={location}>
                <Switch>
                    {routeConfig.routes.map(function(v,k){
                        const {redirect,component,...props}=v;
                        if(redirect){
                            return (<Route key={k} {...props} render={()=>(<Redirect to={redirect}/>)}/>)
                        }
                        else{
                            return (<Route key={k} {...props} component={component}/>)
                        }
                    })}
                    <Route path="*" component={NotFound}/>
                </Switch>
            </AppWrap>
        )
    }
}


export default withRouter(App);