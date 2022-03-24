import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import App from "./App.vue";
import axios from "axios";

const VueRouter = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import("./views/Home.vue"),
    },
    {
      path: "/education/list",
      name: "EList",
      component: () => import("./views/education/List.vue"),
    },
    {
      path: "/education/put",
      name: "EPut",
      component: () => import("./views/education/Post.vue"),
    },
    {
      path: "/graduation/list",
      name: "GList",
      component: () => import("./views/graduation/List.vue"),
    },
    {
      path: "/graduation/put",
      name: "GPut",
      component: () => import("./views/graduation/Post.vue"),
    },
    {
      path: "/books/list",
      name: "BList",
      component: () => import("./views/books/List.vue"),
    },
    {
      path: "/books/put",
      name: "BPut",
      component: () => import("./views/books/Post.vue"),
    },
    {
      path: "/videos/list",
      name: "VList",
      component: () => import("./views/videos/List.vue"),
    },
    {
      path: "/videos/put",
      name: "VPut",
      component: () => import("./views/videos/Post.vue"),
    },
    {
      path: "/journey/list",
      name: "JList",
      component: () => import("./views/journey/List.vue"),
    },
    {
      path: "/journey/put",
      name: "JPut",
      component: () => import("./views/journey/Post.vue"),
    },
  ],
});

const app = createApp(App);
app.use(
  ElementPlus,
  {
    locale: zhCn,
  },
  axios
);
app.use(VueRouter);
app.mount("#app");
