import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import App from "./App.vue";
import axios from "axios";

/**
 * 这里面的路由都作用在App.vue里面的<router-view>标签，如果App.vue里面写了侧边栏，登录页面也会嵌在带有侧边栏页面的主体里
 */
const VueRouter = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/login/Login.vue"),
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("@/views/login/Register.vue"),
    },
    {
      path: "/",
      name: "Layout",
      component: () => import("@/views/Layout.vue"),
      redirect: "/home",
      // children里的路由作用在Layout.vue里面的</router-view>标签
      children: [
        {
          path: "/home",
          name: "Home",
          component: () => import("./views/Home.vue"),
        },
        {
          path: "/user",
          name: "User",
          component: () => import("./views/login/User.vue"),
        },
        {
          path: "education/list",
          name: "EList",
          component: () => import("./views/education/List.vue"),
        },
        {
          path: "education/put",
          name: "EPut",
          component: () => import("./views/education/Post.vue"),
        },
        {
          path: "graduation/list",
          name: "GList",
          component: () => import("./views/graduation/List.vue"),
        },
        {
          path: "graduation/put",
          name: "GPut",
          component: () => import("./views/graduation/Post.vue"),
        },
        {
          path: "books/list",
          name: "BList",
          component: () => import("./views/book/List.vue"),
        },
        {
          path: "books/put",
          name: "BPut",
          component: () => import("./views/book/Post.vue"),
        },
        {
          path: "videos/list",
          name: "VList",
          component: () => import("./views/video/List.vue"),
        },
        {
          path: "videos/put",
          name: "VPut",
          component: () => import("./views/video/Post.vue"),
        },
        {
          path: "journey/list",
          name: "JList",
          component: () => import("./views/journey/List.vue"),
        },
        {
          path: "journey/put",
          name: "JPut",
          component: () => import("./views/journey/Post.vue"),
        },
      ],
    },
  ],
});

// ---------------------- 路由拦截 方法 -----------------------------------//
VueRouter.beforeEach((to, from, next) => {
  // document.title = `${to.meta.title} | vue-manage-system`; //可以设置网站头部
  const role = localStorage.getItem("user");
  if (!role && to.path !== "/login" && to.path !== "/register") {
    next("/login");
  } else {
    if (role && to.path === "/login") {
      next("/home");
    }
    next();
  }
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

//export default后，别的文件通过import就可以使用
export default VueRouter;
