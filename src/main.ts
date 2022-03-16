import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";

import Home from "./views/Home.vue";
import VList from "./views/videos/List.vue";
import VPut from "./views/videos/Put.vue";
import EList from "./views/education/List.vue";
import EPut from "./views/education/Put.vue";
import GList from "./views/graduation/List.vue";
import GPut from "./views/graduation/Put.vue";
import BList from "./views/books/List.vue";
import BPut from "./views/books/Put.vue";
import JList from "./views/journey/List.vue";
import JPut from "./views/journey/Put.vue";

const VueRouter = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/education/list",
      component: EList,
    },
    {
      path: "/education/put",
      component: EPut,
    },
    {
      path: "/graduation/list",
      component: GList,
    },
    {
      path: "/graduation/put",
      component: GPut,
    },
    {
      path: "/books/list",
      component: BList,
    },
    {
      path: "/books/put",
      component: BPut,
    },
    {
      path: "/videos/list",
      component: VList,
    },
    {
      path: "/videos/put",
      component: VPut,
    },
    {
      path: "/journey/list",
      component: JList,
    },
    {
      path: "/journey/put",
      component: JPut,
    },
  ],
});

const app = createApp(App);
app.use(ElementPlus);
app.use(VueRouter);
app.mount("#app");
