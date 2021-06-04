import axios from "axios";
import qs from "qs";
import {toast} from "@/components/hook.js";

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 60000,
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  }
});

// 异常拦截处理器
const errorHandler = (error) => {
  console.dir(error, 90);
  const status = error?.response?.status;
  const data = error?.response?.data || {};
  switch (status) {
    case 301: error.message = "需要登录"; break;
    case 400: error.message = '请求错误'; break;
    case 401: error.message = '未授权，请登录'; break;
    case 403: error.message = '拒绝访问'; break;
    case 404: error.message = `请求地址出错: ${error.response.config.url}`; break;
    case 408: error.message = '请求超时'; break;
    case 500: error.message = '服务器内部错误'; break;
    case 501: error.message = '服务未实现'; break;
    case 502: error.message = '网关错误'; break;
    case 503: error.message = '服务不可用'; break;
    case 504: error.message = '网关超时'; break;
    case 505: error.message = 'HTTP版本不受支持'; break;
    default: break;
  }
  toast({message: data.message || data.msg});
  return Promise.reject(error);
};

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  let {method, params={}, data={}} = config;
  params.timestamp = Date.now();
  config.params = params;
  config.withCredentials = true;
  if(method.toLowerCase() == "post") {
    // let str = qs.stringify(params);
    // config.url += `?${str}`;
  }
  // console.log(method, config);
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // console.log(response);
  const dataAxios = response.data;
  // 这个状态码是和后端约定的
  const { code } = dataAxios;
  // 根据 code 进行判断
  if (code === undefined) {
    // 如果没有 code 代表这不是项目后端开发的接口
    dataAxios.message = dataAxios.message ? dataAxios.message : "不是标准的接口";
  } else {
    // 有 code 代表这是一个后端接口 可以进行进一步的判断
    switch (code) {
      case 200:
      case 800:
      case 801:
      case 802:
      case 803: break;
        // [ 示例 ] code === 200 代表没有错误
      case 400:
        // [ 示例 ] 其它和后台约定的 code
        dataAxios.message = "无效的参数";
        break;
      default:
        // 不是正确的 code
        dataAxios.message = dataAxios.message ? dataAxios.message : "不是正确的code";
    }
  }
  return dataAxios;
}, errorHandler);

export default instance;