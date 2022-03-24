import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
// import { Message } from "@ss/mtd-vue-next";
// import { pickBy, isObject } from "lodash-es";
// import { state as globalState } from "@/pages/index/store/state";
import instance from "./axios";

// const responseHandler = (response: AxiosResponse) => {
//   const { status, data, message, error } = response.data;
//   if (status === 401) {
//     window.location.href = globalState.appState.appSSO.getLoginUrl();
//   } else if (status === 0) {
//     Message({
//       message: message || "您没有权限访问，请联系管理员",
//       type: "error",
//     });
//   }
//   if (data == null || error !== null) {
//     Message({
//       message: error.msg || "请求失败，请稍后重试",
//       type: "error",
//     });
//   }
//   return data;
// };

const ERR_MSG_ENUM = {
  403: () => "您没有权限访问，请联系管理员",
  404: (url: string) => `找不到接口 ${url}`,
  502: () => "接口网关异常，请稍后访问",
  504: (url: string) => `接口 ${url} 超时，请稍后访问`,
};

// const responseErrorHandler = (error: AxiosError) => {
//   const { status, config } = (error && error.response) || {};
//   if (status === 401) {
//     window.location.href = globalState.appState.appSSO.getLoginUrl();
//     return Promise.reject(error);
//   }
//   const { url = "" } = config || {};
//   let message = "服务异常，请稍后访问";
//   if (status && `${status}` in ERR_MSG_ENUM) {
//     message = ERR_MSG_ENUM[status](url) || "";
//   }
//   Message.error({ message: `${status} ${message}` });
//   return Promise.reject(error);
// };

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// instance.interceptors.response.use(responseHandler, responseErrorHandler);

// instance.interceptors.request.use((config: AxiosRequestConfig) => {
//   // ota的所有接口过滤空参数（过滤嵌套两层的参数），注意 FormData不过滤
//   if (
//     config.url &&
//     config.url.includes("ota") &&
//     !(config.data instanceof FormData)
//   ) {
//     config.data = pickBy(config.data, (item: any) => {
//       return item != null && item !== "";
//     });
//     for (const key of Object.keys(config.data)) {
//       if (isObject(config.data[key])) {
//         config.data[key] = pickBy(config.data[key], (item: any) => {
//           return item != null && item !== "";
//         });
//       }
//     }
//   }
//   return config;
// });
export default instance;
