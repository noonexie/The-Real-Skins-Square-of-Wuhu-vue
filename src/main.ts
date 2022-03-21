import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";

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
      component: () => import("./views/education/Put.vue"),
    },
    {
      path: "/graduation/list",
      name: "GList",
      component: () => import("./views/graduation/List.vue"),
    },
    {
      path: "/graduation/put",
      name: "GPut",
      component: () => import("./views/graduation/Put.vue"),
    },
    {
      path: "/books/list",
      name: "BList",
      component: () => import("./views/books/List.vue"),
    },
    {
      path: "/books/put",
      name: "BPut",
      component: () => import("./views/books/Put.vue"),
    },
    {
      path: "/videos/list",
      name: "VList",
      component: () => import("./views/videos/List.vue"),
    },
    {
      path: "/videos/put",
      name: "VPut",
      component: () => import("./views/videos/Put.vue"),
    },
    {
      path: "/journey/list",
      name: "JList",
      component: () => import("./views/journey/List.vue"),
    },
    {
      path: "/journey/put",
      name: "JPut",
      component: () => import("./views/journey/Put.vue"),
    },
  ],
});

const app = createApp(App);
app.use(ElementPlus);
app.use(VueRouter);
app.mount("#app");
