import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import App from "./App.vue";

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
    // {
    //   path: "/register",
    //   name: "Register",
    //   component: () => import("@/views/login/Register.vue"),
    // },
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
          component: () => import("@/views/Home.vue"),
        },
        {
          path: "/user",
          name: "User",
          component: () => import("@/views/login/User.vue"),
        },
        // {
        //   path: "share/list",
        //   name: "SList",
        //   component: () => import("@/views/share/List.vue"),
        // },
        // {
        //   path: "share/put",
        //   name: "SPut",
        //   component: () => import("@/views/share/Post.vue"),
        // },
        {
          path: "player/music",
          name: "Music",
          component: () => import("@/views/player/Music.vue"),
        },
        {
          path: "player/movie",
          name: "Movie",
          component: () => import("@/views/player/Movie.vue"),
        },
        {
          path: "player/chat",
          name: "Chat",
          component: () => import("@/views/player/Chat.vue"),
        },
      ],
    },
  ],
});

// ---------------------- 路由拦截 方法 -----------------------------------//
// VueRouter.beforeEach((to, from, next) => {
//   // document.title = `${to.meta.title} | vue-manage-system`; //可以设置网站头部
//   const role = localStorage.getItem("user");
//   if (!role && to.path !== "/login" && to.path !== "/register") {
//     next("/login");
//   } else {
//     if (role && to.path === "/login") {
//       next("/home");
//     }
//     next();
//   }
// });

const app = createApp(App);
app.use(ElementPlus, {
  locale: zhCn,
});
// app.use(axios);
app.use(VueRouter);
app.mount("#app");

//export default后，别的文件通过import就可以使用
export default VueRouter;
