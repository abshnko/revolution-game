import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { HashRouter } from "react-router-dom";

import reducers from "./reducers";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <HashRouter> */}
      <App />
      {/* </HashRouter> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);