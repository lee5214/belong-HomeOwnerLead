import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./container/App";
import registerServiceWorker from "./registerServiceWorker";

import { create } from "jss";
import JssProvider from "react-jss/lib/JssProvider";
import { createGenerateClassName, jssPreset } from "@material-ui/core/styles";

const generateClassName = createGenerateClassName();
const jss = create(jssPreset());
jss.options.insertionPoint = "insertion-point-jss";

const AppC = () => (
  <JssProvider jss={jss} generateClassName={generateClassName}>
    <App />
  </JssProvider>
);
ReactDOM.render(<AppC />, document.getElementById("root"));
registerServiceWorker();
