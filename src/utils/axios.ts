import VueRouter from "@/main";
import axios from "axios";

/**
 * @see https://github.com/axios/axios#request-config
 */
const configMT = {
  // baseURL: process.env.VUE_APP_ENV === 'development' ? process.env.VUE_APP_API_HOST : '',
  timeout: 60000,
  withCredentials: true, // 跨域请求携带Cookie
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
};

const instance = axios.create(configMT);

// 请求白名单，如果请求在白名单里面，将不会被拦截校验权限
const whiteUrls = ["/user/login", "/user/register"];

// request 拦截器
// 统一处理所有http请求和响应
// 任何请求都会先经过该拦截器的处理
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
instance.interceptors.request.use(
  (config: any) => {
    config.headers["Content-Type"] = "application/json;charset=utf-8";

    // 取出sessionStorage里面缓存的用户信息
    let userJson = sessionStorage.getItem("user");
    if (!whiteUrls.includes(config.url)) {
      // 校验请求白名单
      if (!userJson) {
        VueRouter.push("/login");
      } else {
        let user = JSON.parse(userJson);
        config.headers["token"] = user.token; // 设置请求头
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

VueRouter.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    // 判断该路由是否需要登录权限
    if (sessionStorage.getItem("user")) {
      // 通过vuex sessionStorage里面缓存的用户信息是否存在
      next();
    } else {
      next({
        path: "/login",
        query: { redirect: to.fullPath }, // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  } else {
    next();
  }
});

export default instance;
