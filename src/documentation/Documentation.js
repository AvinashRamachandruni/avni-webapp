import React from "react";
import { Route, Switch, useRouteMatch, withRouter } from "react-router-dom";
import DocumentationList from "./DocumentationList";

function Documentation() {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}`} component={DocumentationList} />
    </Switch>
  );
}

export default withRouter(Documentation);
