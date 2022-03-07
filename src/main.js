import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";

const VueRouter = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: HelloWorld,
    },
    {
      path: "/w1",
      component: HelloWorld,
    },
    {
      path: "/w2",
      component: HelloWorld,
    },
  ],
});

const app = createApp(App);
app.use(ElementPlus);
app.use(VueRouter);
app.mount("#app");
