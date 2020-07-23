import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { STLYE_GUIDE_URL } from "./routes";
import StyleGuidePage from "./pages/StyleGuidePage/StyleGuidePage";
import Main from "./Main";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={STLYE_GUIDE_URL} component={StyleGuidePage} />
      <Route component={Main} />
    </Switch>
  </BrowserRouter>
);

export default Router;
