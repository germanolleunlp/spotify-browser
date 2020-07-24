import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Main from "./Main";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route component={Main} />
    </Switch>
  </BrowserRouter>
);

export default Router;
