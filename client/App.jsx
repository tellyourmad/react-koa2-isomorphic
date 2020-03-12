import React from "react";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import AppWrap from "./components/AppWrap";
import { routes } from "./routeConfig";
import NotFound from "./section/404";

const App = () => (
  <AppWrap>
    <Switch>
      {routes.map(function(v, k) {
        const { redirect, component, ...props } = v;
        if (redirect) {
          return (
            <Route
              key={k}
              {...props}
              render={() => <Redirect to={redirect} />}
            />
          );
        } else {
          return <Route key={k} {...props} component={component} />;
        }
      })}
      <Route path="*" component={NotFound} />
    </Switch>
  </AppWrap>
);

export default App;
