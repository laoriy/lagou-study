import { registerApplication, start } from "single-spa";

// registerApplication({
//   name: "@single-spa/welcome", // 微应用的名称
//   app: () =>
//     import(
//       /* webpackIgnore: true */
//       "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
//     ),
//   activeWhen: ["/"], // 激活的路由
// });

registerApplication(
  "@single-spa/welcome",
  () =>
    import("https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"),
  (location) => location.pathname === "/"
);

registerApplication({
  name: "@laoriy/lagou",
  app: () =>
    import(
      /* webpackIgnore: true */
      "@laoriy/lagou"
    ),
  activeWhen: ["/lagou"],
});

registerApplication({
  name: "@laoriy/todos",
  app: () =>
    import(
      /* webpackIgnore: true */
      "@laoriy/todos"
    ),
  activeWhen: ["/todos"],
});

start({
  urlRerouteOnly: true,
});
