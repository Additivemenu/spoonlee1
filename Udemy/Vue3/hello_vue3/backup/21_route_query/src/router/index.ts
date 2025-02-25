import { createRouter, createWebHistory } from "vue-router";

import Home from "@/pages/Home.vue";
import News from "@/pages/News.vue";
import About from "@/pages/About.vue";
import Detail from "@/pages/Detail.vue";

// create router instance
const router = createRouter({
  history: createWebHistory(), // router working mode
  routes: [
    {
      name: "homePage",
      path: "/home",
      component: Home,
    },
    {
      name: "newsPage",
      path: "/news",
      component: News,
      children: [{ path: "detail", component: Detail }],
    },
    {
      name: "aboutPage",
      path: "/about",
      component: About,
    },
  ],
});

export default router;
