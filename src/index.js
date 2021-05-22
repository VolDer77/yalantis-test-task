import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route path="/employees">
        <App />
      </Route>
      <Redirect to="/employees" />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
