import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
import App from "./App";

function mount(el, { onNavgate, defaultHistory, initialPath }) {
  console.log("mount", initialPath, "initialPath--");
  const history =
    defaultHistory || createMemoryHistory({ initialEntries: [initialPath] });
  if (onNavgate) history.listen(onNavgate);
  ReactDOM.render(<App history={history} />, el);
  return {
    onParentNavigate({ pathname: nextPathname }) {
      // 当主应用路由跳转时，通知微应用进行页面响应
      const pathname = history.location.pathname;
      if (nextPathname !== pathname) {
        history.push(nextPathname);
      }
    },
  };
}

if (process.env.NODE_ENV === "development") {
  const el = document.querySelector("#dev-marketing");
  if (el)
    mount(el, {
      defaultHistory: createBrowserHistory(),
    });
}

export { mount };
