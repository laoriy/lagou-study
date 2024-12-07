import { registerApplication, start } from "single-spa";

registerApplication({
  name: "@single-spa/welcome", // 微应用的名称
  app: () =>
    import(
      /* webpackIgnore: true */
      "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
    ),
  activeWhen: ["/"], // 激活的路由
});

// registerApplication({
//   name: "@laoriy/navbar",
//   app: () =>
//     import(
//       /* webpackIgnore: true */
//       "@laoriy/navbar"
//     ),
//   activeWhen: ["/"],
// });

start({
  urlRerouteOnly: true,
});
