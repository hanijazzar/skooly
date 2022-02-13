import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

import { HashRouter, Route, Switch } from "react-router-dom";
import "./scss/style.scss";

const queryClient = new QueryClient();

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const NotFound = React.lazy(() => import("./components/NotFound"));

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route
              exact
              path="/not-found"
              name="Error 404"
              render={(props) => <NotFound {...props} />}
            />
            <Route
              path="/"
              name="Home"
              render={(props) => <TheLayout {...props} />}
            />
          </Switch>
        </React.Suspense>
      </HashRouter>
    </QueryClientProvider>
  );
};

export default App;
