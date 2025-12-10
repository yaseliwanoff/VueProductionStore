import { createApp } from "vue";
import { createPinia } from "pinia";
import { router } from "@/routes/index-route";

import App from "@/App.vue";
import "@/style.css";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

import { useAuthUserState } from "./stores/auth";

app.mount("#app");

const authStore = useAuthUserState();
authStore.initialize();
