import React from "react";
import ReactDOM from "react-dom";

import AppProvider from "./containers/AppProvider";
import App from "./containers/App";

function render(Component) {
    return ReactDOM.render(
        <AppProvider component={Component} />,
        document.getElementById("content"),
    );
}

render(App);

if (module.hot) {
    module.hot.accept("./containers/App", () => {
        const nextApp = require("./containers/App").default;
        render(nextApp);
    });
}



// WEBPACK FOOTER //
// ./src/index.js
