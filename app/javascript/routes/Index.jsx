import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Start from "../components/Start";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Start} />
    </Switch>
  </Router>
);
