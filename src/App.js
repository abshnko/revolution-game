import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import GamePage from "./components/GamePage/GamePage";
import AdminPage from "./components/AdminPage/AdminPage";
import data from "./data";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/admin">
            <AdminPage questions={data} />
          </Route>
          <Route path="/">
            <GamePage questions={data} />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
