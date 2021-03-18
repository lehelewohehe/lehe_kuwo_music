import axios from "axios";
import qs from "qs";


const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 60000,
  headers: {'Content-Type': "application/json;charset=utf-8"}
});

console.dir(instance);

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  let {method, params={}} = config;
  if(method.toLowerCase() == "post") {
    params.timeStamp = Date.now();
  }
  let str = qs.stringify(params);
  config.url += `?${str}`;
  console.log(method, config);
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default instance;