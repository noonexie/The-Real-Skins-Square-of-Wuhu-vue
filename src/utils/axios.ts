import VueRouter from "@/main";
import axios from "axios";

/**
 * @see https://github.com/axios/axios#request-config
 */
const configMT = {
  // baseURL: "http://36.133.29.83:9090", //app
  // baseURL: "https://api.cupfox.app", //web
  // baseURL: process.env.VUE_APP_ENV === 'development' ? process.env.VUE_APP_API_HOST : '',
  timeout: 60000,
  // withCredentials: true, // 跨域请求携带Cookie
  // headers: {
  //   "X-Requested-With": "XMLHttpRequest",
  // },
};

const instance = axios.create(configMT);

// 请求白名单，如果请求在白名单里面，将不会被拦截校验权限
const whiteUrls = ["/user/login", "/user/register"];

// request 拦截器
// 统一处理所有http请求和响应
// 任何请求都会先经过该拦截器的处理
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
// instance.interceptors.request.use(
//   (config: any) => {
//     config.headers["Content-Type"] = "application/json;charset=utf-8";

//     // 取出sessionStorage里面缓存的用户信息
//     // let userJson = sessionStorage.getItem("user"); //sessionStorage存在浏览器内存，浏览器一关就没了
//     let userJson = localStorage.getItem("user"); //localStorage存在用户本地，不清楚浏览器本地缓存一直都在？
//     if (!whiteUrls.includes(config.url)) {
//       // 校验请求白名单
//       if (!userJson) {
//         VueRouter.push("/login");
//       } else {
//         let user = JSON.parse(userJson);
//         config.headers["token"] = user.token; // 设置请求头
//       }
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
