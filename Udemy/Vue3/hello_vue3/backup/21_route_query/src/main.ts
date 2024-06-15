import { createApp } from "vue";
import App from "./App.vue"; // Importing App.vue root component

import router from "./router"; //! Importing router

const app = createApp(App);

app.use(router); //! Using the router
app.mount("#app"); // Mounting the App.vue component to the root element with id="app"
