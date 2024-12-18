import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
console.log(document.querySelector("#single-spa-layout"));

const routes = constructRoutes(document.querySelector("#single-spa-layout"));
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);

/**
 * 以下方式是没有使用single-spa-layout的方式
 */

// registerApplication({
//   name: "@single-spa/welcome", // 微应用的名称
//   app: () =>
//     System.import(
//       /* webpackIgnore: true */
//       "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
//     ),
//   activeWhen: ["/"], // 激活的路由
// });

// registerApplication(
//   "@single-spa/welcome",
//   () =>
//     System.import(
//       "https://cdn.jsdelivr.net/npm/single-spa-welcome@2.4.3/dist/single-spa-welcome.js"
//     ),
//   (location) => location.pathname === "/"
// );

// registerApplication({
//   name: "@laoriy/lagou",
//   app: () =>
//     System.import(
//       /* webpackIgnore: true */
//       "@laoriy/lagou"
//     ),
//   activeWhen: ["/lagou"],
// });

// registerApplication({
//   name: "@laoriy/todos",
//   app: () =>
//     System.import(
//       /* webpackIgnore: true */
//       "@laoriy/todos"
//     ),
//   activeWhen: ["/todos"],
// });

// registerApplication({
//   name: "@laoriy/realworld",
//   app: () => System.import("@laoriy/realworld"),
//   activeWhen: ["/realworld"],
// });

start({
  urlRerouteOnly: true,
});
