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
      children: [
        {
          name: "newsDetail",
          path: "detail/:id/:title/:content?", // for using params to pass parameters in the URL
          component: Detail,
          // props: true, // ! 1st 写法: pass the route params (not query) as props to the component. for better developer experience

          // ! 2nd 写法: 函数写法, 可以自己决定将什么作为props传递给路由组件 => 适用query or params URL参数
          // 其实是提供了一种为路由组件传递props的方式
          props(route) {
            return route.params; // this will pass as props to the Detail component
          },

          // 3rd 写法 : 对象写法, 可以自己决定将什么作为props传递给路由组件 (但只能写死)
          // props: {
          //   id: 1,
          //   title: "default title",
          //   content: "default content",
          // },
        },
      ],
    },
    {
      name: "aboutPage",
      path: "/about",
      component: About,
    },
  ],
});

export default router;
