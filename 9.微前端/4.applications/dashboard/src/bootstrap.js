import { createApp } from "vue";
import Dashboard from "./components/Dashboard.vue";
import PrimeVue from "primevue/config";
function mount(el) {
  const app = createApp(Dashboard);
  app.use(PrimeVue, {
    /* options */
  });
  app.mount(el);
}

if (process.env.NODE_ENV === "development") {
  const el = document.querySelector("#dev-dashboard");
  if (el) mount(el);
}

export { mount };
