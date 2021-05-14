import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SWRConfig } from "swr";

import { Characters, HouseDetails } from "./pages";
import { fetcher } from "./api";

//TODO: remove
// const routes = [
//   {
//     path: "/",
//     component: Characters,
//   },
//   {
//     path: "/house-details",
//     component: HouseDetails,
//   },
// ];

const App = () => {
  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
      }}
    >
      <Router>
        <Switch>
          <Route exact path="/">
            <Characters />
          </Route>
          <Route path="/house-details/:id">
            <HouseDetails />
          </Route>
        </Switch>
      </Router>
    </SWRConfig>
  );
};

export default App;
