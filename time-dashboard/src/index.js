import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import AdminLayout from "layouts/Admin.js";
import Login from "views/Login.js";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ModalContext from "contexts/AppContext";

// import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
// import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <ModalContext>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" render={(props) => <AdminLayout {...props} />} />
      </Switch>
    </ModalContext>
  </BrowserRouter>
);
