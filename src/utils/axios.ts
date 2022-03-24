import axios from "axios";

/**
 * @see https://github.com/axios/axios#request-config
 */
const config = {
  // baseURL: process.env.VUE_APP_ENV === 'development' ? process.env.VUE_APP_API_HOST : '',
  timeout: 60000,
  withCredentials: true, // 跨域请求携带Cookie
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
};

const instance = axios.create(config);

export default instance;
