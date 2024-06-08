import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import ShopState from "./Context/ShopState";
import { Provider } from "react-redux";
import store from "./Redux/store";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme/themeProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ShopState>
      <Provider store={store}>
        <Router>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </Router>
      </Provider>
    </ShopState>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
