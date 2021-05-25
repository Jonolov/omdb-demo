import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Start from "../components/Start";
import Movie from "../components/Movie";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Start} />
      <Route path="/search/:title" exact component={Start} />
      <Route path="/movie/:id" exact component={Movie} />
    </Switch>
  </Router>
);
