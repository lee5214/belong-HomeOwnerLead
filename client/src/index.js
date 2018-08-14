import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./view/App";
import { composeWithDevTools } from "redux-devtools-extension";
import registerServiceWorker from "./registerServiceWorker";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

import { create } from "jss";
import JssProvider from "react-jss/lib/JssProvider";
import { createGenerateClassName, jssPreset } from "@material-ui/core/styles";

/*
 *  reducer
 */
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

/*
 *  css module with jss
 */
const generateClassName = createGenerateClassName();
const jss = create(jssPreset());
jss.options.insertionPoint = "insertion-point-jss";

const AppContainer = () => (
  <Provider store={store}>
    <JssProvider jss={jss} generateClassName={generateClassName}>
      <App />
    </JssProvider>
  </Provider>
);
ReactDOM.render(<AppContainer />, document.getElementById("root"));
registerServiceWorker();
