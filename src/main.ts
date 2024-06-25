import { createApp } from "vue";
import App from "./App.vue";

import plugins from "./plugins";
import store from "@/store";
import router from "./router";

import "uno.css";
import "virtual:uno.css";

import "@assets/styles/index.scss";

const app = createApp(App);

app.use(router).use(store).use(plugins).mount("#app");
