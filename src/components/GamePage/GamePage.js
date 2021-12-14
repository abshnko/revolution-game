import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../../styles/main/style.css";

import Rules from "./Rules";
import Gameplay from "./Gameplay";
import Creators from "./Creators";

function GamePage({ questions }) {
  return (
    <>
      <Router>
        <Switch>
          <div className="game-page">
            <Route exact path="/">
              <Rules />
            </Route>
            <Route path="/game">
              <Gameplay questions={questions} />
            </Route>
            <Route path="/creators">
              <Creators />
            </Route>
          </div>
        </Switch>
      </Router>
    </>
  );
}

export default GamePage;
