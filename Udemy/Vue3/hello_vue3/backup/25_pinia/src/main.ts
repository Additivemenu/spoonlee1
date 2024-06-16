import { createApp } from "vue";
import App from "./App.vue"; // Importing App.vue root component

import { createPinia } from "pinia";

const app = createApp(App);
// create pinia
const pinia = createPinia();
app.use(pinia);

app.mount("#app"); // Mounting the App.vue component to the root element with id="app"
