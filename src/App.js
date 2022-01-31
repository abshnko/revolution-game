import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserHistory } from "history";
import { HashRouter } from "react-router-dom";

import { getQuestions } from "./actions/questions";
import GamePage from "./components/GamePage/GamePage";
import AdminPage from "./components/AdminPage";
import Rules from "./components/Rules";
import Creators from "./components/Creators";

function App() {
  const [adminMode, setAdminMode] = useState(false);
  const dispatch = useDispatch();
  let questions = useSelector((state) => state.questions);
  questions = questions.sort((a, b) => {
    return a.id - b.id;
  });
  const history = createBrowserHistory();

  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);

  return (
    <>
      {/* <Router history={history}> */}
      <HashRouter>
        <Switch>
          <Route path="/admin" history={history}>
            <AdminPage questions={questions} setAdminMode={setAdminMode} />
          </Route>
          <Route path="/game">
            <GamePage
              questions={questions}
              adminMode={adminMode}
              history={history}
              setAdminMode={setAdminMode}
            />
          </Route>
          <Route path="/creators">
            <Creators adminMode={adminMode} />
          </Route>
          <Route exact path="/">
            <Rules />
          </Route>
        </Switch>
      </HashRouter>
      {/* </Router> */}
    </>
  );
}

export default App;
