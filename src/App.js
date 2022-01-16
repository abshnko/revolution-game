import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { createBrowserHistory } from "history";
import { useDispatch, useSelector } from "react-redux";
// import { browserHistory } from "react-router";
import { createBrowserHistory } from "history";
import { HashRouter } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import {
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from "./actions/questions";
import GamePage from "./components/GamePage/GamePage";
import AdminPage from "./components/AdminPage/AdminPage";
import data from "./data";
import Rules from "./components/GamePage/Rules";
import Creators from "./components/GamePage/Creators";

//change data to dispatched Questions!!!!!
function App() {
  const [adminMode, setAdminMode] = useState(false); //CHANGE TO FALSE
  const dispatch = useDispatch();
  let questions = useSelector((state) => state.questions);
  questions = questions.sort((a, b) => {
    return a.id - b.id;
  });
  console.log(questions);
  const history = createBrowserHistory();

  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);

  return (
    <>
      {/* <Router history={history}> */}
      <BrowserRouter>
        <Switch>
          <Route path={process.env.PUBLIC_URL + "/admin"} history={history}>
            <AdminPage questions={questions} setAdminMode={setAdminMode} />
          </Route>
          <Route path={process.env.PUBLIC_URL + "/game"}>
            <GamePage
              questions={questions}
              adminMode={adminMode}
              history={history}
              setAdminMode={setAdminMode}
            />
          </Route>
          <Route path={process.env.PUBLIC_URL + "/creators"}>
            <Creators adminMode={adminMode} />
          </Route>
          <Route exact path={process.env.PUBLIC_URL + "/"}>
            <Rules />
          </Route>
        </Switch>
      </BrowserRouter>
      {/* </Router> */}
    </>
  );
}

export default App;
